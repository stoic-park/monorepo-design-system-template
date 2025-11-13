#!/bin/bash
set -e

# ========================================
# 백업 스크립트
# ========================================

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 설정
BACKUP_DIR="${BACKUP_DIR:-/backup/dashboard}"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS="${RETENTION_DAYS:-30}"

# 백업 디렉토리 생성
mkdir -p "$BACKUP_DIR"

# 1. Docker 볼륨 백업
backup_volumes() {
    log_info "Docker 볼륨 백업 중..."
    
    local volumes=$(docker volume ls --format '{{.Name}}' | grep "^monorepo-design-system-template")
    
    for volume in $volumes; do
        local backup_file="$BACKUP_DIR/${volume}_${DATE}.tar.gz"
        log_info "백업 중: $volume -> $backup_file"
        
        docker run --rm \
            -v "$volume:/data" \
            -v "$BACKUP_DIR:/backup" \
            alpine tar czf "/backup/$(basename $backup_file)" -C /data .
        
        if [ $? -eq 0 ]; then
            log_info "백업 성공: $volume"
        else
            log_error "백업 실패: $volume"
        fi
    done
}

# 2. 설정 파일 백업
backup_config() {
    log_info "설정 파일 백업 중..."
    
    local config_backup="$BACKUP_DIR/config_${DATE}.tar.gz"
    
    tar czf "$config_backup" \
        docker-compose*.yml \
        .env.production \
        deploy/nginx/ \
        apps/*/Dockerfile \
        apps/*/nginx.conf \
        2>/dev/null || true
    
    if [ -f "$config_backup" ]; then
        log_info "설정 파일 백업 완료: $config_backup"
    else
        log_error "설정 파일 백업 실패"
    fi
}

# 3. 데이터 디렉토리 백업 (있는 경우)
backup_data() {
    if [ -d "./data" ]; then
        log_info "데이터 디렉토리 백업 중..."
        
        local data_backup="$BACKUP_DIR/data_${DATE}.tar.gz"
        tar czf "$data_backup" ./data
        
        if [ -f "$data_backup" ]; then
            log_info "데이터 백업 완료: $data_backup"
        fi
    fi
}

# 4. 오래된 백업 삭제
cleanup_old_backups() {
    log_info "오래된 백업 정리 중... (${RETENTION_DAYS}일 이상)"
    
    find "$BACKUP_DIR" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete
    
    log_info "정리 완료"
}

# 5. 백업 목록 출력
list_backups() {
    log_info "최근 백업 목록:"
    ls -lh "$BACKUP_DIR" | tail -n 10
}

# 메인 실행
main() {
    log_info "백업 시작..."
    
    backup_volumes
    backup_config
    backup_data
    cleanup_old_backups
    list_backups
    
    log_info "백업 완료!"
}

main "$@"

