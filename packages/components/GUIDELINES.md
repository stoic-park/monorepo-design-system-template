# DBDS 사용 가이드라인

> 디자이너와 개발자를 위한 실전 가이드

---

## 📋 목차

1. [컴포넌트 사용 가이드](#컴포넌트-사용-가이드)
2. [레이아웃 가이드](#레이아웃-가이드)
3. [타이포그래피 가이드](#타이포그래피-가이드)
4. [색상 사용 가이드](#색상-사용-가이드)
5. [간격 및 정렬](#간격-및-정렬)
6. [상태 표시](#상태-표시)
7. [폼 디자인](#폼-디자인)
8. [반응형 디자인](#반응형-디자인)

---

## 컴포넌트 사용 가이드

### 1. Button (버튼)

#### 언제 어떤 variant를 사용하나?

```tsx
// Primary: 페이지의 주요 액션 (1개만!)
<Button variant="primary">저장</Button>

// Secondary: 보조 액션
<Button variant="secondary">취소</Button>

// Outline: 추가 옵션
<Button variant="outline">더보기</Button>

// Ghost: 최소 강조 액션
<Button variant="ghost">닫기</Button>
```

#### 버튼 사용 규칙

1. **페이지당 Primary 버튼은 1개만**
   - 사용자가 가장 원하는 액션을 명확히

2. **버튼 순서**

   ```tsx
   // ✅ 오른쪽이 Primary
   <Modal.Footer>
     <Button variant="outline">취소</Button>
     <Button variant="primary">확인</Button>
   </Modal.Footer>
   ```

3. **로딩 상태**
   ```tsx
   <Button disabled={loading}>
     {loading && <Spinner size="sm" variant="white" />}
     {loading ? '저장 중...' : '저장'}
   </Button>
   ```

---

### 2. Input (입력 필드)

#### 기본 사용

```tsx
// ✅ 항상 label 제공
<Input
  label="이메일"
  type="email"
  placeholder="user@example.com"
  required
/>

// ❌ label 없이 사용하지 않기
<Input placeholder="이메일" />  // 접근성 문제
```

#### 에러 처리

```tsx
<Input
  label="비밀번호"
  type="password"
  error={!!errors.password}
  errorMessage={errors.password}
/>
```

#### Placeholder vs Label

```
Label: 필드 설명 (항상 표시)
Placeholder: 입력 예시 (입력 시 사라짐)

✅ 둘 다 사용
❌ Placeholder만 사용
```

---

### 3. Select (드롭다운)

#### 옵션 구성

```tsx
<Select
  label="부서"
  options={[
    { label: '선택하세요', value: '' }, // 기본 옵션
    { label: '개발팀', value: 'dev' },
    { label: '디자인팀', value: 'design' },
  ]}
/>
```

#### 비활성화 옵션

```tsx
<Select
  options={[
    { label: '선택하세요', value: '' },
    { label: '만석', value: 'full', disabled: true },
  ]}
/>
```

---

### 4. Modal (모달)

#### 크기 선택

```tsx
// sm: 확인 다이얼로그
<Modal size="sm">정말 삭제하시겠습니까?</Modal>

// md: 기본 폼 (기본값)
<Modal size="md">사용자 정보 수정</Modal>

// lg: 복잡한 폼
<Modal size="lg">상세 설정</Modal>

// xl: 테이블/차트
<Modal size="xl">데이터 조회</Modal>
```

#### 구조 패턴

```tsx
<Modal open={isOpen} onClose={handleClose} title="제목">
  <Modal.Body>{/* 내용 */}</Modal.Body>
  <Modal.Footer>
    <Button variant="outline" onClick={handleClose}>
      취소
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      확인
    </Button>
  </Modal.Footer>
</Modal>
```

---

### 5. Toast (알림)

#### 사용 시나리오

```tsx
const toast = useToast();

// Success: 작업 완료
toast.success('저장되었습니다');

// Error: 오류 발생
toast.error('네트워크 오류가 발생했습니다');

// Warning: 주의 필요
toast.warning('변경사항이 저장되지 않았습니다');

// Info: 정보 안내
toast.info('새로운 메시지가 도착했습니다');
```

#### Toast vs Alert vs Modal

```
Toast: 일시적 알림 (3초 후 자동 사라짐)
  → 저장 완료, 오류 발생

Alert: 페이지 내 지속 표시
  → 중요 공지, 경고 메시지

Modal: 사용자 응답 필요
  → 확인/취소 선택, 폼 입력
```

---

## 레이아웃 가이드

### Container 사용

```tsx
// 최대 너비 제한 (가독성)
<div className="max-w-7xl mx-auto px-4">
  {/* 콘텐츠 */}
</div>

// 폼은 좁게
<div className="max-w-2xl mx-auto">
  <form>...</form>
</div>

// 대시보드는 넓게
<div className="max-w-screen-2xl mx-auto">
  <Dashboard />
</div>
```

### Grid vs Flex

```tsx
// Grid: 정렬된 카드 레이아웃
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>

// Flex: 버튼 그룹, 인라인 요소
<div className="flex items-center gap-2">
  <Button />
  <Button />
</div>
```

---

## 타이포그래피 가이드

### Heading 사용

```tsx
// ✅ 페이지당 h1은 1개만
<Typography variant="h1">페이지 제목</Typography>

// ✅ 계층 구조 유지
<Typography variant="h2">섹션 제목</Typography>
<Typography variant="h3">서브섹션</Typography>
```

### 텍스트 색상

```tsx
// Primary: 주요 텍스트
<p className="text-gray-900">중요한 내용</p>

// Secondary: 부가 설명
<p className="text-gray-600">추가 정보</p>

// Disabled: 비활성화
<p className="text-gray-400">사용 불가</p>
```

---

## 색상 사용 가이드

### 기본 규칙

```
1. 흑백을 기본으로
2. Accent는 의미가 있을 때만
3. 상태 표시에만 컬러 사용
```

### 상태별 색상

```tsx
// Success (성공)
<Badge variant="success">완료</Badge>
<Alert variant="success">작업 완료</Alert>

// Error (오류)
<Badge variant="error">실패</Badge>
<Alert variant="error">오류 발생</Alert>

// Warning (경고)
<Badge variant="warning">대기</Badge>
<Alert variant="warning">주의 필요</Alert>

// Info (정보)
<Badge variant="info">진행 중</Badge>
<Alert variant="info">안내</Alert>
```

---

## 간격 및 정렬

### 일관된 간격

```tsx
// Section 간격
<div className="space-y-8">  // 32px

// Card 간격
<div className="space-y-4">  // 16px

// Form Field 간격
<div className="space-y-3">  // 12px

// Inline 요소 간격
<div className="flex gap-2">  // 8px
```

### 여백 (Padding)

```
Card: p-6 (24px)
Modal Body: p-6 (24px)
Button: px-4 py-2 (16px, 8px)
```

---

## 상태 표시

### 로딩 상태

```tsx
// 버튼 내부 로딩
<Button disabled>
  <Spinner size="sm" variant="white" />
  로딩 중...
</Button>

// 페이지 로딩
<div className="flex items-center justify-center h-screen">
  <Spinner size="xl" />
</div>

// 차트 로딩
<EChart option={option} loading={isLoading} />
```

### 빈 상태 (Empty State)

```tsx
<div className="text-center py-12">
  <Typography variant="h3" className="text-gray-400">
    데이터가 없습니다
  </Typography>
  <p className="text-gray-500 mt-2">새로운 항목을 추가해보세요</p>
  <Button variant="primary" className="mt-4">
    추가하기
  </Button>
</div>
```

---

## 폼 디자인

### 폼 레이아웃

```tsx
<form className="max-w-2xl space-y-6">
  {/* 그룹 1 */}
  <div className="space-y-4">
    <Typography variant="h3">기본 정보</Typography>
    <Input label="이름" required />
    <Input label="이메일" type="email" required />
  </div>

  <Divider />

  {/* 그룹 2 */}
  <div className="space-y-4">
    <Typography variant="h3">추가 정보</Typography>
    <Select label="부서" options={depts} />
    <TextArea label="소개" rows={4} />
  </div>

  <Divider />

  {/* 액션 */}
  <div className="flex justify-end gap-2">
    <Button variant="outline">취소</Button>
    <Button variant="primary" type="submit">
      저장
    </Button>
  </div>
</form>
```

### 필수 필드 표시

```tsx
// ✅ label에 * 표시
<Input label="이름 *" required />

// 또는
<Input
  label={
    <>
      이름 <span className="text-red-500">*</span>
    </>
  }
  required
/>
```

---

## 반응형 디자인

### Mobile First

```tsx
// ✅ 모바일 기본, 데스크탑 확장
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ 데스크탑 기본
<div className="grid-cols-3 md:grid-cols-1">
```

### 반응형 간격

```tsx
// 모바일: 작게, 데스크탑: 크게
<div className="p-4 md:p-6 lg:p-8">

// 모바일: 세로, 데스크탑: 가로
<div className="flex flex-col md:flex-row gap-4">
```

---

## ⚠️ 일반적인 실수

### 1. 컴포넌트 스타일 커스터마이징

```tsx
// ❌ Bad
<Button className="!bg-red-500 !text-yellow-300">
  저장
</Button>

// ✅ Good
// 새로운 variant가 필요하면 디자인 시스템에 추가 요청
<Button variant="primary">
  저장
</Button>
```

### 2. 임의의 값 사용

```tsx
// ❌ Bad
<div className="mt-[23px] ml-[17px]">

// ✅ Good
<div className="mt-6 ml-4">  // spacing token
```

### 3. 인라인 스타일

```tsx
// ❌ Bad
<div style={{ marginTop: 20, color: '#333' }}>

// ✅ Good
<div className="mt-5 text-gray-800">
```

---

## 🎯 베스트 프랙티스

### 1. 컴포넌트 조합

```tsx
// ✅ 작은 컴포넌트를 조합
<Card>
  <div className="p-6 space-y-4">
    <Typography variant="h3">제목</Typography>
    <Divider />
    <Input label="이름" />
    <div className="flex justify-end gap-2">
      <Button variant="outline">취소</Button>
      <Button variant="primary">저장</Button>
    </div>
  </div>
</Card>
```

### 2. 일관된 에러 처리

```tsx
// ✅ 모든 입력 필드에 동일한 패턴
const [errors, setErrors] = useState({});

<Input
  label="이름"
  error={!!errors.name}
  errorMessage={errors.name}
/>

<Select
  label="부서"
  error={!!errors.dept}
  errorMessage={errors.dept}
  options={depts}
/>
```

### 3. Toast 사용 패턴

```tsx
const toast = useToast();

// 성공
const handleSave = async () => {
  try {
    await saveData();
    toast.success('저장되었습니다');
  } catch (error) {
    toast.error('저장에 실패했습니다');
  }
};

// 삭제 확인 (Modal + Toast 조합)
const handleDelete = async () => {
  // Modal로 확인
  const confirmed = await confirmDialog();
  if (!confirmed) return;

  // 삭제 실행
  await deleteData();

  // Toast로 결과 알림
  toast.success('삭제되었습니다');
};
```

---

## 📱 반응형 패턴

### 폼 레이아웃

```tsx
// Desktop: 2열
// Mobile: 1열
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input label="성" />
  <Input label="이름" />
</div>
```

### 버튼 그룹

```tsx
// Desktop: 가로
// Mobile: 세로 (full width)
<div className="flex flex-col md:flex-row gap-2">
  <Button fullWidth className="md:w-auto">
    취소
  </Button>
  <Button fullWidth className="md:w-auto" variant="primary">
    확인
  </Button>
</div>
```

---

## 🎨 테마 일관성 체크리스트

폼 제작 시 확인사항:

- [ ] 모든 입력 필드에 label이 있나?
- [ ] Primary 버튼이 1개뿐인가?
- [ ] 간격이 토큰 값인가? (4, 8, 12, 16, 24, 32...)
- [ ] 색상이 토큰에서 나왔나?
- [ ] 에러 처리가 일관적인가?
- [ ] 로딩 상태가 표시되나?
- [ ] 모바일에서도 잘 보이나?
- [ ] 키보드로 모든 기능 사용 가능한가?

---

## 📚 참고 자료

- [Design Principles](./DESIGN_PRINCIPLES.md) - 디자인 철학
- [Patterns](./PATTERNS.md) - 재사용 가능한 패턴
- [Storybook](http://localhost:6006) - 컴포넌트 라이브러리
- [Figma](링크) - 디자인 파일

---

**일관성 있는 디자인은 사용자 경험의 기본입니다.**  
**가이드라인을 따라 제품의 품질을 높이세요!** 🎯

알겠습니다 주인님!
