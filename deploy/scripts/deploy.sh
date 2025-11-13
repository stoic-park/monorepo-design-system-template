#!/bin/bash
set -e

# ========================================
# 온프레미스 배포 스크립트
# ========================================

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 로그 함수
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 환경 확인
check_requirements() {
    log_info "필수 요구사항 확인 중..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker가 설치되지 않았습니다."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose가 설치되지 않았습니다."
        exit 1
    fi
    
    log_info "모든 요구사항이 충족되었습니다."
}

# 환경 변수 파일 확인
check_env_file() {
    if [ ! -f .env.production ]; then
        log_warn ".env.production 파일이 없습니다. 예시 파일을 복사합니다."
        cp .env.production.example .env.production
        log_warn "배포 전에 .env.production 파일을 수정하세요."
        exit 1
    fi
}

# 이전 빌드 정리
cleanup() {
    log_info "이전 빌드 아티팩트 정리 중..."
    docker-compose down --remove-orphans
    docker system prune -f --volumes
    log_info "정리 완료"
}

# 이미지 빌드
build_images() {
    log_info "Docker 이미지 빌드 중..."
    docker-compose build --no-cache
    log_info "빌드 완료"
}

# 헬스체크
health_check() {
    local service=$1
    local url=$2
    local max_attempts=30
    local attempt=1
    
    log_info "$service 헬스체크 중..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "$url" > /dev/null; then
            log_info "$service 헬스체크 통과!"
            return 0
        fi
        
        log_warn "헬스체크 시도 $attempt/$max_attempts 실패. 2초 후 재시도..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    log_error "$service 헬스체크 실패"
    return 1
}

# 서비스 시작
start_services() {
    log_info "서비스 시작 중..."
    docker-compose up -d
    
    # 서비스가 완전히 시작될 때까지 대기
    sleep 5
    
    # 헬스체크
    if ! health_check "Dashboard" "http://localhost/health"; then
        log_error "Dashboard 시작 실패"
        docker-compose logs dashboard
        exit 1
    fi
    
    log_info "모든 서비스가 정상적으로 시작되었습니다."
}

# 배포 후 검증
verify_deployment() {
    log_info "배포 검증 중..."
    
    # 컨테이너 상태 확인
    if ! docker-compose ps | grep -q "Up"; then
        log_error "일부 컨테이너가 실행되지 않았습니다."
        docker-compose ps
        exit 1
    fi
    
    # 디스크 사용량 확인
    disk_usage=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ "$disk_usage" -gt 85 ]; then
        log_warn "디스크 사용량이 ${disk_usage}%입니다. 공간을 확보하세요."
    fi
    
    # 메모리 사용량 확인
    mem_usage=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100}')
    if [ "$mem_usage" -gt 85 ]; then
        log_warn "메모리 사용량이 ${mem_usage}%입니다."
    fi
    
    log_info "배포 검증 완료"
}

# 배포 정보 출력
print_info() {
    echo ""
    log_info "=========================================="
    log_info "배포 완료!"
    log_info "=========================================="
    echo ""
    log_info "Dashboard: http://localhost"
    log_info "Storybook: http://localhost/storybook"
    log_info "Health Check: http://localhost/health"
    echo ""
    log_info "로그 확인: docker-compose logs -f"
    log_info "서비스 중지: docker-compose down"
    log_info "서비스 재시작: docker-compose restart"
    echo ""
}

# 메인 실행
main() {
    log_info "온프레미스 배포 시작..."
    
    check_requirements
    check_env_file
    
    # 옵션 파싱
    if [ "$1" == "--clean" ]; then
        cleanup
    fi
    
    build_images
    start_services
    verify_deployment
    print_info
}

# 스크립트 실행
main "$@"

