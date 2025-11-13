#!/bin/bash
set -e

# ========================================
# 모니터링 스택 설정 스크립트
# ========================================

GREEN='\033[0;32m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

# Prometheus 설정 생성
setup_prometheus() {
    log_info "Prometheus 설정 생성 중..."
    
    mkdir -p monitoring/prometheus
    
    cat > monitoring/prometheus/prometheus.yml <<EOF
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  # Node Exporter (시스템 메트릭)
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']

  # Nginx 메트릭
  - job_name: 'nginx'
    static_configs:
      - targets: ['nginx:80']
    metrics_path: /nginx_status

  # Docker 메트릭
  - job_name: 'docker'
    static_configs:
      - targets: ['host.docker.internal:9323']
EOF
    
    log_info "Prometheus 설정 완료"
}

# Grafana 대시보드 설정
setup_grafana() {
    log_info "Grafana 대시보드 설정 중..."
    
    mkdir -p monitoring/grafana-dashboards
    
    cat > monitoring/grafana-dashboards/dashboard.yml <<EOF
apiVersion: 1

providers:
  - name: 'Default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    allowUiUpdates: true
    options:
      path: /etc/grafana/provisioning/dashboards
EOF
    
    log_info "Grafana 설정 완료"
}

# Loki 설정
setup_loki() {
    log_info "Loki 설정 생성 중..."
    
    mkdir -p monitoring
    
    cat > monitoring/loki-config.yml <<EOF
auth_enabled: false

server:
  http_listen_port: 3100

ingester:
  lifecycler:
    ring:
      kvstore:
        store: inmemory
      replication_factor: 1
  chunk_idle_period: 5m
  chunk_retain_period: 30s

schema_config:
  configs:
    - from: 2024-01-01
      store: boltdb
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

storage_config:
  boltdb:
    directory: /loki/index
  filesystem:
    directory: /loki/chunks

limits_config:
  enforce_metric_name: false
  reject_old_samples: true
  reject_old_samples_max_age: 168h

chunk_store_config:
  max_look_back_period: 0s

table_manager:
  retention_deletes_enabled: false
  retention_period: 0s
EOF
    
    log_info "Loki 설정 완료"
}

# Promtail 설정
setup_promtail() {
    log_info "Promtail 설정 생성 중..."
    
    cat > monitoring/promtail-config.yml <<EOF
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: docker
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
    relabel_configs:
      - source_labels: ['__meta_docker_container_name']
        regex: '/(.*)'
        target_label: 'container'
      - source_labels: ['__meta_docker_container_log_stream']
        target_label: 'logstream'
      - source_labels: ['__meta_docker_container_label_logging_jobname']
        target_label: 'job'
EOF
    
    log_info "Promtail 설정 완료"
}

# Docker Compose 모니터링 파일 생성
create_monitoring_compose() {
    log_info "모니터링 Docker Compose 파일 생성 중..."
    
    cat > docker-compose.monitoring.yml <<EOF
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: ds-prometheus
    volumes:
      - ./monitoring/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus-data:/prometheus
    ports:
      - "9090:9090"
    networks:
      - monitoring
    restart: unless-stopped
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=30d'

  grafana:
    image: grafana/grafana:latest
    container_name: ds-grafana
    ports:
      - "3001:3000"
    volumes:
      - grafana-data:/var/lib/grafana
      - ./monitoring/grafana-dashboards:/etc/grafana/provisioning/dashboards:ro
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=\${GRAFANA_PASSWORD:-admin}
      - GF_INSTALL_PLUGINS=grafana-clock-panel
    networks:
      - monitoring
    restart: unless-stopped

  node-exporter:
    image: prom/node-exporter:latest
    container_name: ds-node-exporter
    ports:
      - "9100:9100"
    networks:
      - monitoring
    restart: unless-stopped
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro

  loki:
    image: grafana/loki:latest
    container_name: ds-loki
    ports:
      - "3100:3100"
    volumes:
      - ./monitoring/loki-config.yml:/etc/loki/local-config.yaml:ro
      - loki-data:/loki
    networks:
      - monitoring
    restart: unless-stopped

  promtail:
    image: grafana/promtail:latest
    container_name: ds-promtail
    volumes:
      - /var/log:/var/log:ro
      - ./monitoring/promtail-config.yml:/etc/promtail/config.yml:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - monitoring
    restart: unless-stopped

volumes:
  prometheus-data:
  grafana-data:
  loki-data:

networks:
  monitoring:
    driver: bridge
EOF
    
    log_info "모니터링 Docker Compose 파일 생성 완료"
}

# 메인 실행
main() {
    log_info "모니터링 스택 설정 시작..."
    
    setup_prometheus
    setup_grafana
    setup_loki
    setup_promtail
    create_monitoring_compose
    
    log_info "=========================================="
    log_info "모니터링 스택 설정 완료!"
    log_info "=========================================="
    echo ""
    log_info "모니터링 시작: docker-compose -f docker-compose.monitoring.yml up -d"
    log_info "Prometheus: http://localhost:9090"
    log_info "Grafana: http://localhost:3001 (admin/admin)"
    log_info "Loki: http://localhost:3100"
    echo ""
}

main "$@"

