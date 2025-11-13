#!/bin/bash
set -e

# ========================================
# 복구 스크립트
# ========================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 사용법
usage() {
    echo "사용법: $0 <backup_file>"
    echo ""
    echo "예시:"
    echo "  $0 /backup/dashboard/dashboard-logs_20240101_120000.tar.gz"
    echo ""
    echo "사용 가능한 백업 목록:"
    ls -lh /backup/dashboard/*.tar.gz 2>/dev/null || echo "  백업 파일이 없습니다."
    exit 1
}

# 인자 확인
if [ -z "$1" ]; then
    usage
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
    log_error "백업 파일을 찾을 수 없습니다: $BACKUP_FILE"
    exit 1
fi

# 확인 메시지
confirm() {
    log_warn "경고: 이 작업은 현재 데이터를 백업 데이터로 덮어씁니다."
    read -p "계속하시겠습니까? (yes/no): " response
    
    if [ "$response" != "yes" ]; then
        log_info "복구가 취소되었습니다."
        exit 0
    fi
}

# 볼륨 복구
restore_volume() {
    local backup_file=$1
    local volume_name=$(basename "$backup_file" | sed 's/_[0-9]*\.tar\.gz$//')
    
    log_info "복구 중: $volume_name"
    
    # 볼륨이 존재하는지 확인
    if ! docker volume inspect "$volume_name" &>/dev/null; then
        log_info "볼륨 생성 중: $volume_name"
        docker volume create "$volume_name"
    fi
    
    # 데이터 복구
    docker run --rm \
        -v "$volume_name:/data" \
        -v "$(dirname $backup_file):/backup" \
        alpine sh -c "rm -rf /data/* && tar xzf /backup/$(basename $backup_file) -C /data"
    
    if [ $? -eq 0 ]; then
        log_info "복구 완료: $volume_name"
    else
        log_error "복구 실패: $volume_name"
        exit 1
    fi
}

# 설정 파일 복구
restore_config() {
    local config_backup=$1
    
    if [[ "$config_backup" == *"config_"* ]]; then
        log_info "설정 파일 복구 중..."
        tar xzf "$config_backup" -C .
        log_info "설정 파일 복구 완료"
    fi
}

# 메인 실행
main() {
    log_info "복구 프로세스 시작..."
    
    confirm
    
    # 서비스 중지
    log_info "서비스 중지 중..."
    docker-compose down
    
    # 복구 수행
    if [[ "$BACKUP_FILE" == *"config_"* ]]; then
        restore_config "$BACKUP_FILE"
    else
        restore_volume "$BACKUP_FILE"
    fi
    
    # 서비스 재시작
    log_info "서비스 시작 중..."
    docker-compose up -d
    
    # 헬스체크
    sleep 5
    if curl -f http://localhost/health &>/dev/null; then
        log_info "복구가 성공적으로 완료되었습니다!"
    else
        log_warn "서비스가 시작되었지만 헬스체크에 실패했습니다. 로그를 확인하세요."
        log_info "로그 확인: docker-compose logs"
    fi
}

main "$@"

