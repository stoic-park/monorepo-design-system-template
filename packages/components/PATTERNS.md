# DBDS 디자인 패턴

> 자주 사용되는 UI 패턴 모음집

---

## 📋 목차

1. [인증 패턴](#인증-패턴)
2. [폼 패턴](#폼-패턴)
3. [데이터 표시 패턴](#데이터-표시-패턴)
4. [피드백 패턴](#피드백-패턴)
5. [네비게이션 패턴](#네비게이션-패턴)

---

## 인증 패턴

### 로그인 폼

```tsx
import {
  Input,
  Button,
  Checkbox,
  Divider,
  Alert,
  useToast,
} from '@dbds/components';

function LoginForm() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success('로그인 성공');
    } catch (error) {
      toast.error('로그인 실패');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <Typography variant="h2" className="text-center mb-8">
        로그인
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          errorMessage={errors.email}
          fullWidth
          required
        />

        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          errorMessage={errors.password}
          fullWidth
          required
        />

        <Checkbox
          label="로그인 상태 유지"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />

        <Button type="submit" variant="primary" fullWidth>
          로그인
        </Button>

        <Divider label="또는" />

        <Button variant="outline" fullWidth>
          소셜 로그인
        </Button>
      </form>
    </div>
  );
}
```

---

## 폼 패턴

### CRUD 폼 (생성/수정)

```tsx
import {
  Input,
  Select,
  TextArea,
  Radio,
  Button,
  Divider,
  Modal,
} from '@dbds/components';

function UserForm({ user, onSave, onCancel }) {
  return (
    <form className="space-y-6">
      {/* 기본 정보 */}
      <div className="space-y-4">
        <Typography variant="h3">기본 정보</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="성" required fullWidth />
          <Input label="이름" required fullWidth />
        </div>

        <Input label="이메일" type="email" required fullWidth />

        <Select label="부서" options={departments} required fullWidth />
      </div>

      <Divider />

      {/* 추가 정보 */}
      <div className="space-y-4">
        <Typography variant="h3">추가 정보</Typography>

        <TextArea
          label="소개"
          rows={4}
          placeholder="간단한 소개를 입력하세요"
          fullWidth
        />

        <div>
          <label className="text-sm font-medium text-gray-900 block mb-2">
            사용 여부
          </label>
          <div className="flex gap-4">
            <Radio name="useYn" value="Y" label="Y" defaultChecked />
            <Radio name="useYn" value="N" label="N" />
          </div>
        </div>
      </div>

      <Divider />

      {/* 액션 버튼 */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button variant="primary" type="submit">
          저장
        </Button>
      </div>
    </form>
  );
}
```

---

### 검색 폼

```tsx
function SearchForm({ onSearch }) {
  return (
    <Card>
      <div className="p-6 space-y-4">
        <Typography variant="h3">검색 조건</Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="검색어" placeholder="이름, 이메일로 검색" />

          <Select
            label="부서"
            options={[
              { label: '전체', value: '' },
              { label: '개발팀', value: 'dev' },
            ]}
          />

          <Select
            label="상태"
            options={[
              { label: '전체', value: '' },
              { label: '활성', value: 'active' },
              { label: '비활성', value: 'inactive' },
            ]}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">초기화</Button>
          <Button variant="primary">검색</Button>
        </div>
      </div>
    </Card>
  );
}
```

---

## 데이터 표시 패턴

### 카드 리스트

```tsx
function UserList({ users }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <Card key={user.id} variant="bordered">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Typography variant="h4">{user.name}</Typography>
              <Badge variant={user.active ? 'success' : 'default'}>
                {user.active ? '활성' : '비활성'}
              </Badge>
            </div>

            <Divider />

            <div className="space-y-2 mt-4">
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.dept}</p>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" fullWidth>
                수정
              </Button>
              <Button variant="outline" size="sm" fullWidth>
                삭제
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### 통계 대시보드

```tsx
function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="elevated">
          <div className="p-6">
            <Typography variant="small" className="text-gray-600">
              총 사용자
            </Typography>
            <Typography variant="h2" className="mt-2">
              1,234
            </Typography>
            <Badge variant="success" className="mt-2">
              +12% 증가
            </Badge>
          </div>
        </Card>

        {/* 나머지 KPI 카드들 */}
      </div>

      <Divider />

      {/* 차트 */}
      <Card>
        <div className="p-6">
          <Typography variant="h3" className="mb-4">
            월별 추이
          </Typography>
          <EChart option={chartOption} height={400} />
        </div>
      </Card>
    </div>
  );
}
```

---

## 피드백 패턴

### 성공 피드백

```tsx
// 1. Toast (간단한 알림)
const handleSave = async () => {
  await save();
  toast.success('저장되었습니다');
};

// 2. Alert (페이지 상단 알림)
{
  saved && (
    <Alert variant="success" closable onClose={() => setSaved(false)}>
      저장이 완료되었습니다.
    </Alert>
  );
}

// 3. Modal (중요한 확인)
<Modal open={saved} onClose={() => setSaved(false)} size="sm">
  <Modal.Body>
    <div className="text-center py-4">
      <div className="text-4xl mb-4">✓</div>
      <Typography variant="h3">저장 완료</Typography>
    </div>
  </Modal.Body>
</Modal>;
```

### 확인 다이얼로그

```tsx
function DeleteButton({ onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = async () => {
    await onDelete();
    setShowConfirm(false);
    toast.success('삭제되었습니다');
  };

  return (
    <>
      <Button variant="outline" onClick={() => setShowConfirm(true)}>
        삭제
      </Button>

      <Modal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="삭제 확인"
        size="sm"
      >
        <Modal.Body>
          <Alert variant="warning">
            정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setShowConfirm(false)}>
            취소
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
```

### 로딩 상태

```tsx
function DataPage() {
  const { data, isLoading } = useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  return <DataTable data={data} />;
}
```

### 빈 상태

```tsx
function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="mb-4">
        <Spinner size="xl" className="opacity-20" />
      </div>
      <Typography variant="h3" className="text-gray-400 mb-2">
        데이터가 없습니다
      </Typography>
      <Typography variant="body" className="text-gray-500 mb-4">
        새로운 항목을 추가해보세요
      </Typography>
      <Button variant="primary">추가하기</Button>
    </div>
  );
}
```

---

## 네비게이션 패턴

### 탭 네비게이션

```tsx
function TabsExample() {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div>
      {/* 탭 버튼 */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('info')}
          className={clsx(
            'px-4 py-2 border-b-2 transition-colors',
            activeTab === 'info'
              ? 'border-black text-black'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          )}
        >
          기본 정보
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={clsx(
            'px-4 py-2 border-b-2 transition-colors',
            activeTab === 'settings'
              ? 'border-black text-black'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          )}
        >
          설정
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="mt-6">
        {activeTab === 'info' && <InfoTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
}
```

### 필터 + 정렬

```tsx
function DataView() {
  return (
    <div className="space-y-4">
      {/* 필터 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant="default">전체 (123)</Badge>
          <Badge variant="success">완료 (89)</Badge>
          <Badge variant="error">실패 (12)</Badge>
          <Badge variant="warning">대기 (22)</Badge>
        </div>

        <Select
          options={[
            { label: '최신순', value: 'latest' },
            { label: '오래된순', value: 'oldest' },
            { label: '이름순', value: 'name' },
          ]}
        />
      </div>

      <Divider />

      {/* 데이터 */}
      <DataList />
    </div>
  );
}
```

---

## 폼 패턴

### 단계별 폼 (Stepper)

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center',
                'font-bold text-sm',
                step >= s ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
              )}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={clsx(
                  'flex-1 h-0.5 mx-2',
                  step > s ? 'bg-black' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* 단계별 내용 */}
      {step === 1 && <Step1Form />}
      {step === 2 && <Step2Form />}
      {step === 3 && <Step3Form />}

      <Divider />

      {/* 네비게이션 */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          이전
        </Button>
        <Button
          variant="primary"
          onClick={() => setStep(step + 1)}
          disabled={step === 3}
        >
          {step === 3 ? '완료' : '다음'}
        </Button>
      </div>
    </div>
  );
}
```

### 인라인 편집

```tsx
function InlineEdit({ value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  if (!editing) {
    return (
      <div className="flex items-center gap-2">
        <span>{value}</span>
        <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
          수정
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
      <Button
        size="sm"
        onClick={() => {
          onSave(editValue);
          setEditing(false);
        }}
      >
        저장
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setEditValue(value);
          setEditing(false);
        }}
      >
        취소
      </Button>
    </div>
  );
}
```

---

## 데이터 표시 패턴

### 상세 정보 페이지

```tsx
function DetailPage({ data }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h2">{data.name}</Typography>
          <Typography variant="body" className="text-gray-600">
            {data.description}
          </Typography>
        </div>
        <Badge variant="success">활성</Badge>
      </div>

      <Divider />

      {/* 정보 섹션 */}
      <Card>
        <div className="p-6 space-y-4">
          <Typography variant="h3">기본 정보</Typography>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600">이메일</span>
              <p className="text-base font-medium">{data.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">부서</span>
              <p className="text-base font-medium">{data.dept}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">가입일</span>
              <p className="text-base font-medium">{data.joinDate}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">상태</span>
              <p className="text-base font-medium">{data.status}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 액션 */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">수정</Button>
        <Button variant="outline">삭제</Button>
      </div>
    </div>
  );
}
```

---

## 피드백 패턴

### 성공/실패 처리

```tsx
function ActionButton() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);

    try {
      await performAction();
      toast.success('작업이 완료되었습니다', '성공');
    } catch (error) {
      toast.error(
        error.message || '작업을 처리하는 중 오류가 발생했습니다',
        '오류'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="primary" onClick={handleAction} disabled={loading}>
      {loading && <Spinner size="sm" variant="white" />}
      {loading ? '처리 중...' : '실행'}
    </Button>
  );
}
```

### 검증 피드백

```tsx
function ValidatedForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form className="space-y-4">
      {Object.keys(errors).length > 0 && (
        <Alert variant="error" title="입력 오류">
          모든 필수 항목을 올바르게 입력해주세요.
        </Alert>
      )}

      <Input
        label="이름"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={!!errors.name}
        errorMessage={errors.name}
      />

      <Input
        label="이메일"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={!!errors.email}
        errorMessage={errors.email}
      />
    </form>
  );
}
```

---

## 🎯 패턴 선택 가이드

### 언제 무엇을 사용하나?

| 상황             | 패턴            | 컴포넌트                       |
| ---------------- | --------------- | ------------------------------ |
| 사용자 로그인    | 인증 패턴       | Input, Button, Checkbox        |
| 데이터 생성/수정 | CRUD 폼         | Input, Select, TextArea, Modal |
| 데이터 검색      | 검색 폼         | Input, Select, Button          |
| 리스트 표시      | 카드 리스트     | Card, Badge                    |
| 작업 완료 알림   | 성공 피드백     | Toast                          |
| 삭제 확인        | 확인 다이얼로그 | Modal                          |
| 로딩 중          | 로딩 상태       | Spinner                        |
| 데이터 없음      | 빈 상태         | EmptyState                     |

---

## 📚 추가 패턴 (향후 추가 예정)

- [ ] 결제 프로세스
- [ ] 파일 업로드 플로우
- [ ] 멀티 선택 리스트
- [ ] 드래그 앤 드롭
- [ ] 무한 스크롤
- [ ] 가상 스크롤 테이블
- [ ] 대시보드 레이아웃
- [ ] 설정 페이지

---

**패턴을 활용하면 개발 속도가 3배 빨라집니다!**  
**검증된 솔루션을 재사용하세요!** 🚀

알겠습니다 주인님!
