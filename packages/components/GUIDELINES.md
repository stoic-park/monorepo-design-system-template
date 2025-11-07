# Design System ?�용 가?�드?�인

> ?�자?�너?� 개발?��? ?�한 ?�전 가?�드

---

## ?�� 목차

1. [컴포?�트 ?�용 가?�드](#컴포?�트-?�용-가?�드)
2. [?�이?�웃 가?�드](#?�이?�웃-가?�드)
3. [?�?�포그래??가?�드](#?�?�포그래??가?�드)
4. [?�상 ?�용 가?�드](#?�상-?�용-가?�드)
5. [간격 �??�렬](#간격-�??�렬)
6. [?�태 ?�시](#?�태-?�시)
7. [???�자??(#???�자??
8. [반응???�자??(#반응???�자??

---

## 컴포?�트 ?�용 가?�드

### 1. Button (버튼)

#### ?�제 ?�떤 variant�??�용?�나?

```tsx
// Primary: ?�이지??주요 ?�션 (1개만!)
<Button variant="primary">?�??/Button>

// Secondary: 보조 ?�션
<Button variant="secondary">취소</Button>

// Outline: 추�? ?�션
<Button variant="outline">?�보�?/Button>

// Ghost: 최소 강조 ?�션
<Button variant="ghost">?�기</Button>
```

#### 버튼 ?�용 규칙

1. **?�이지??Primary 버튼?� 1개만**
   - ?�용?��? 가???�하???�션??명확??
2. **버튼 ?�서**

   ```tsx
   // ???�른쪽이 Primary
   <Modal.Footer>
     <Button variant="outline">취소</Button>
     <Button variant="primary">?�인</Button>
   </Modal.Footer>
   ```

3. **로딩 ?�태**
   ```tsx
   <Button disabled={loading}>
     {loading && <Spinner size="sm" variant="white" />}
     {loading ? '?�??�?..' : '?�??}
   </Button>
   ```

---

### 2. Input (?�력 ?�드)

#### 기본 ?�용

```tsx
// ????�� label ?�공
<Input
  label="?�메??
  type="email"
  placeholder="user@example.com"
  required
/>

// ??label ?�이 ?�용?��? ?�기
<Input placeholder="?�메?? />  // ?�근??문제
```

#### ?�러 처리

```tsx
<Input
  label="비�?번호"
  type="password"
  error={!!errors.password}
  errorMessage={errors.password}
/>
```

#### Placeholder vs Label

```
Label: ?�드 ?�명 (??�� ?�시)
Placeholder: ?�력 ?�시 (?�력 ???�라�?

???????�용
??Placeholder�??�용
```

---

### 3. Select (?�롭?�운)

#### ?�션 구성

```tsx
<Select
  label="부??
  options={[
    { label: '?�택?�세??, value: '' }, // 기본 ?�션
    { label: '개발?�', value: 'dev' },
    { label: '?�자?��?', value: 'design' },
  ]}
/>
```

#### 비활?�화 ?�션

```tsx
<Select
  options={[
    { label: '?�택?�세??, value: '' },
    { label: '만석', value: 'full', disabled: true },
  ]}
/>
```

---

### 4. Modal (모달)

#### ?�기 ?�택

```tsx
// sm: ?�인 ?�이?�로�?<Modal size="sm">?�말 ??��?�시겠습?�까?</Modal>

// md: 기본 ??(기본�?
<Modal size="md">?�용???�보 ?�정</Modal>

// lg: 복잡????<Modal size="lg">?�세 ?�정</Modal>

// xl: ?�이�?차트
<Modal size="xl">?�이??조회</Modal>
```

#### 구조 ?�턴

```tsx
<Modal open={isOpen} onClose={handleClose} title="?�목">
  <Modal.Body>{/* ?�용 */}</Modal.Body>
  <Modal.Footer>
    <Button variant="outline" onClick={handleClose}>
      취소
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      ?�인
    </Button>
  </Modal.Footer>
</Modal>
```

---

### 5. Toast (?�림)

#### ?�용 ?�나리오

```tsx
const toast = useToast();

// Success: ?�업 ?�료
toast.success('?�?�되?�습?�다');

// Error: ?�류 발생
toast.error('?�트?�크 ?�류가 발생?�습?�다');

// Warning: 주의 ?�요
toast.warning('변경사??�� ?�?�되지 ?�았?�니??);

// Info: ?�보 ?�내
toast.info('?�로??메시지가 ?�착?�습?�다');
```

#### Toast vs Alert vs Modal

```
Toast: ?�시???�림 (3�????�동 ?�라�?
  ???�???�료, ?�류 발생

Alert: ?�이지 ??지???�시
  ??중요 공�?, 경고 메시지

Modal: ?�용???�답 ?�요
  ???�인/취소 ?�택, ???�력
```

---

## ?�이?�웃 가?�드

### Container ?�용

```tsx
// 최�? ?�비 ?�한 (가?�성)
<div className="max-w-7xl mx-auto px-4">
  {/* 콘텐�?*/}
</div>

// ?��? 좁게
<div className="max-w-2xl mx-auto">
  <form>...</form>
</div>

// ?�?�보?�는 ?�게
<div className="max-w-screen-2xl mx-auto">
  <Dashboard />
</div>
```

### Grid vs Flex

```tsx
// Grid: ?�렬??카드 ?�이?�웃
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>

// Flex: 버튼 그룹, ?�라???�소
<div className="flex items-center gap-2">
  <Button />
  <Button />
</div>
```

---

## ?�?�포그래??가?�드

### Heading ?�용

```tsx
// ???�이지??h1?� 1개만
<Typography variant="h1">?�이지 ?�목</Typography>

// ??계층 구조 ?��?
<Typography variant="h2">?�션 ?�목</Typography>
<Typography variant="h3">?�브?�션</Typography>
```

### ?�스???�상

```tsx
// Primary: 주요 ?�스??<p className="text-gray-900">중요???�용</p>

// Secondary: 부가 ?�명
<p className="text-gray-600">추�? ?�보</p>

// Disabled: 비활?�화
<p className="text-gray-400">?�용 불�?</p>
```

---

## ?�상 ?�용 가?�드

### 기본 규칙

```
1. ?�백??기본?�로
2. Accent???��?가 ?�을 ?�만
3. ?�태 ?�시?�만 컬러 ?�용
```

### ?�태�??�상

```tsx
// Success (?�공)
<Badge variant="success">?�료</Badge>
<Alert variant="success">?�업 ?�료</Alert>

// Error (?�류)
<Badge variant="error">?�패</Badge>
<Alert variant="error">?�류 발생</Alert>

// Warning (경고)
<Badge variant="warning">?��?/Badge>
<Alert variant="warning">주의 ?�요</Alert>

// Info (?�보)
<Badge variant="info">진행 �?/Badge>
<Alert variant="info">?�내</Alert>
```

---

## 간격 �??�렬

### ?��???간격

```tsx
// Section 간격
<div className="space-y-8">  // 32px

// Card 간격
<div className="space-y-4">  // 16px

// Form Field 간격
<div className="space-y-3">  // 12px

// Inline ?�소 간격
<div className="flex gap-2">  // 8px
```

### ?�백 (Padding)

```
Card: p-6 (24px)
Modal Body: p-6 (24px)
Button: px-4 py-2 (16px, 8px)
```

---

## ?�태 ?�시

### 로딩 ?�태

```tsx
// 버튼 ?��? 로딩
<Button disabled>
  <Spinner size="sm" variant="white" />
  로딩 �?..
</Button>

// ?�이지 로딩
<div className="flex items-center justify-center h-screen">
  <Spinner size="xl" />
</div>

// 차트 로딩
<EChart option={option} loading={isLoading} />
```

### �??�태 (Empty State)

```tsx
<div className="text-center py-12">
  <Typography variant="h3" className="text-gray-400">
    ?�이?��? ?�습?�다
  </Typography>
  <p className="text-gray-500 mt-2">?�로????��??추�??�보?�요</p>
  <Button variant="primary" className="mt-4">
    추�??�기
  </Button>
</div>
```

---

## ???�자??
### ???�이?�웃

```tsx
<form className="max-w-2xl space-y-6">
  {/* 그룹 1 */}
  <div className="space-y-4">
    <Typography variant="h3">기본 ?�보</Typography>
    <Input label="?�름" required />
    <Input label="?�메?? type="email" required />
  </div>

  <Divider />

  {/* 그룹 2 */}
  <div className="space-y-4">
    <Typography variant="h3">추�? ?�보</Typography>
    <Select label="부?? options={depts} />
    <TextArea label="?�개" rows={4} />
  </div>

  <Divider />

  {/* ?�션 */}
  <div className="flex justify-end gap-2">
    <Button variant="outline">취소</Button>
    <Button variant="primary" type="submit">
      ?�??    </Button>
  </div>
</form>
```

### ?�수 ?�드 ?�시

```tsx
// ??label??* ?�시
<Input label="?�름 *" required />

// ?�는
<Input
  label={
    <>
      ?�름 <span className="text-red-500">*</span>
    </>
  }
  required
/>
```

---

## 반응???�자??
### Mobile First

```tsx
// ??모바??기본, ?�스?�탑 ?�장
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ???�스?�탑 기본
<div className="grid-cols-3 md:grid-cols-1">
```

### 반응??간격

```tsx
// 모바?? ?�게, ?�스?�탑: ?�게
<div className="p-4 md:p-6 lg:p-8">

// 모바?? ?�로, ?�스?�탑: 가�?<div className="flex flex-col md:flex-row gap-4">
```

---

## ?�️ ?�반?�인 ?�수

### 1. 컴포?�트 ?��???커스?�마?�징

```tsx
// ??Bad
<Button className="!bg-red-500 !text-yellow-300">
  ?�??</Button>

// ??Good
// ?�로??variant가 ?�요?�면 ?�자???�스?�에 추�? ?�청
<Button variant="primary">
  ?�??</Button>
```

### 2. ?�의??�??�용

```tsx
// ??Bad
<div className="mt-[23px] ml-[17px]">

// ??Good
<div className="mt-6 ml-4">  // spacing token
```

### 3. ?�라???��???
```tsx
// ??Bad
<div style={{ marginTop: 20, color: '#333' }}>

// ??Good
<div className="mt-5 text-gray-800">
```

---

## ?�� 베스???�랙?�스

### 1. 컴포?�트 조합

```tsx
// ???��? 컴포?�트�?조합
<Card>
  <div className="p-6 space-y-4">
    <Typography variant="h3">?�목</Typography>
    <Divider />
    <Input label="?�름" />
    <div className="flex justify-end gap-2">
      <Button variant="outline">취소</Button>
      <Button variant="primary">?�??/Button>
    </div>
  </div>
</Card>
```

### 2. ?��????�러 처리

```tsx
// ??모든 ?�력 ?�드???�일???�턴
const [errors, setErrors] = useState({});

<Input
  label="?�름"
  error={!!errors.name}
  errorMessage={errors.name}
/>

<Select
  label="부??
  error={!!errors.dept}
  errorMessage={errors.dept}
  options={depts}
/>
```

### 3. Toast ?�용 ?�턴

```tsx
const toast = useToast();

// ?�공
const handleSave = async () => {
  try {
    await saveData();
    toast.success('?�?�되?�습?�다');
  } catch (error) {
    toast.error('?�?�에 ?�패?�습?�다');
  }
};

// ??�� ?�인 (Modal + Toast 조합)
const handleDelete = async () => {
  // Modal�??�인
  const confirmed = await confirmDialog();
  if (!confirmed) return;

  // ??�� ?�행
  await deleteData();

  // Toast�?결과 ?�림
  toast.success('??��?�었?�니??);
};
```

---

## ?�� 반응???�턴

### ???�이?�웃

```tsx
// Desktop: 2??// Mobile: 1??<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input label="?? />
  <Input label="?�름" />
</div>
```

### 버튼 그룹

```tsx
// Desktop: 가�?// Mobile: ?�로 (full width)
<div className="flex flex-col md:flex-row gap-2">
  <Button fullWidth className="md:w-auto">
    취소
  </Button>
  <Button fullWidth className="md:w-auto" variant="primary">
    ?�인
  </Button>
</div>
```

---

## ?�� ?�마 ?��???체크리스??
???�작 ???�인?�항:

- [ ] 모든 ?�력 ?�드??label???�나?
- [ ] Primary 버튼??1개뿐?��??
- [ ] 간격???�큰 값인가? (4, 8, 12, 16, 24, 32...)
- [ ] ?�상???�큰?�서 ?�왔??
- [ ] ?�러 처리가 ?��??�인가?
- [ ] 로딩 ?�태가 ?�시?�나?
- [ ] 모바?�에?�도 ??보이??
- [ ] ?�보?�로 모든 기능 ?�용 가?�한가?

---

## ?�� 참고 ?�료

- [Design Principles](./DESIGN_PRINCIPLES.md) - ?�자??철학
- [Patterns](./PATTERNS.md) - ?�사??가?�한 ?�턴
- [Storybook](http://localhost:6006) - 컴포?�트 ?�이브러�?- [Figma](링크) - ?�자???�일

---

**?��????�는 ?�자?��? ?�용??경험??기본?�니??**  
**가?�드?�인???�라 ?�품???�질???�이?�요!** ?��

?�겠?�니??주인??
