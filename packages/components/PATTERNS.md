# Design System 디자인 패턴

> 자주 사용하는 UI 패턴 모음집

---

## 목차

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
} from '@design-system/components';

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
  Modal,
} from '@design-system/components';

function UserForm({ open, onClose, onSave, initialData = {} }) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const handleSubmit = async () => {
    try {
      await onSave(formData);
      toast.success('저장되었습니다');
      onClose();
    } catch (error) {
      toast.error('저장에 실패했습니다');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="사용자 등록">
      <Modal.Body>
        <div className="space-y-4">
          <Input
            label="이름"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            errorMessage={errors.name}
            fullWidth
            required
          />

          <Input
            label="이메일"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={!!errors.email}
            errorMessage={errors.email}
            fullWidth
            required
          />

          <Select
            label="부서"
            value={formData.department}
            onChange={(e) => handleChange('department', e.target.value)}
            options={departments}
            fullWidth
            required
          />

          <TextArea
            label="소개"
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={4}
            fullWidth
          />

          <div>
            <label className="text-sm font-medium block mb-2">사용 여부</label>
            <div className="flex gap-4">
              <Radio
                name="useYn"
                value="Y"
                label="Y"
                checked={formData.useYn === 'Y'}
                onChange={() => handleChange('useYn', 'Y')}
              />
              <Radio
                name="useYn"
                value="N"
                label="N"
                checked={formData.useYn === 'N'}
                onChange={() => handleChange('useYn', 'N')}
              />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
```

### 검색 및 필터

```tsx
import { Input, Select, Button } from '@design-system/components';

function SearchFilter({ onSearch }) {
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    status: '',
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({ keyword: '', category: '', status: '' });
    onSearch({ keyword: '', category: '', status: '' });
  };

  return (
    <Card padding="md" className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          label="검색어"
          placeholder="검색어를 입력하세요"
          value={filters.keyword}
          onChange={(e) =>
            setFilters({ ...filters, keyword: e.target.value })
          }
          fullWidth
        />

        <Select
          label="카테고리"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
          options={categories}
          fullWidth
        />

        <Select
          label="상태"
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
          options={statuses}
          fullWidth
        />

        <div className="flex items-end gap-2">
          <Button variant="primary" onClick={handleSearch} fullWidth>
            검색
          </Button>
          <Button variant="outline" onClick={handleReset}>
            초기화
          </Button>
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
import { Card, Badge, Button } from '@design-system/components';

function CardList({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.id} variant="bordered" padding="md">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <Typography variant="h3">{item.title}</Typography>
              <Badge variant={item.status === 'active' ? 'success' : 'default'}>
                {item.status}
              </Badge>
            </div>

            <Typography variant="body2" color="secondary">
              {item.description}
            </Typography>

            <Divider />

            <div className="flex justify-between items-center">
              <Typography variant="caption">{item.date}</Typography>
              <Button variant="ghost" size="sm">
                자세히 보기
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### 테이블 리스트

```tsx
import { Button, Badge, Checkbox } from '@design-system/components';

function DataTable({ data, onEdit, onDelete }) {
  const [selected, setSelected] = useState([]);

  const toggleSelection = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3">
              <Checkbox
                checked={selected.length === data.length}
                onChange={(e) =>
                  setSelected(e.target.checked ? data.map((d) => d.id) : [])
                }
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              이름
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              이메일
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              상태
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <Checkbox
                  checked={selected.includes(row.id)}
                  onChange={() => toggleSelection(row.id)}
                />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">{row.name}</td>
              <td className="px-4 py-3 whitespace-nowrap">{row.email}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <Badge variant={row.status === 'active' ? 'success' : 'default'}>
                  {row.status}
                </Badge>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right space-x-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(row)}>
                  수정
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(row)}>
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### 상세 페이지

```tsx
import { Card, Badge, Button, Divider } from '@design-system/components';

function DetailPage({ data, onEdit, onDelete }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card padding="lg">
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <Typography variant="h1" className="mb-2">
              {data.title}
            </Typography>
            <div className="flex items-center gap-2">
              <Badge variant="success">{data.status}</Badge>
              <Typography variant="caption" color="secondary">
                작성일: {data.createdAt}
              </Typography>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>
              수정
            </Button>
            <Button variant="outline" onClick={onDelete}>
              삭제
            </Button>
          </div>
        </div>

        <Divider className="my-6" />

        {/* 본문 */}
        <div className="space-y-4">
          <div>
            <Typography variant="body1" weight="semibold" className="mb-1">
              설명
            </Typography>
            <Typography variant="body2" color="secondary">
              {data.description}
            </Typography>
          </div>

          <div>
            <Typography variant="body1" weight="semibold" className="mb-1">
              담당자
            </Typography>
            <Typography variant="body2" color="secondary">
              {data.assignee}
            </Typography>
          </div>

          <div>
            <Typography variant="body1" weight="semibold" className="mb-1">
              태그
            </Typography>
            <div className="flex gap-2">
              {data.tags?.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

---

## 피드백 패턴

### 로딩 상태

```tsx
import { Spinner, Card } from '@design-system/components';

function LoadingState({ isLoading, children }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return children;
}

// 사용 예시
function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  return (
    <LoadingState isLoading={isLoading}>
      <DataList data={data} />
    </LoadingState>
  );
}
```

### 에러 상태

```tsx
import { Alert, Button } from '@design-system/components';

function ErrorState({ error, onRetry }) {
  return (
    <div className="max-w-md mx-auto p-8">
      <Alert variant="error" title="오류가 발생했습니다" closable={false}>
        <div className="mt-2 space-y-3">
          <Typography variant="body2">{error.message}</Typography>
          <Button variant="outline" onClick={onRetry} fullWidth>
            다시 시도
          </Button>
        </div>
      </Alert>
    </div>
  );
}
```

### 빈 상태

```tsx
import { Button, Typography } from '@design-system/components';

function EmptyState({ title, description, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Typography variant="h3" className="mb-2">
        {title}
      </Typography>
      <Typography variant="body2" color="secondary" className="mb-6">
        {description}
      </Typography>
      {action && (
        <Button variant="primary" onClick={onAction}>
          {action}
        </Button>
      )}
    </div>
  );
}

// 사용 예시
function DataList({ items }) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="데이터가 없습니다"
        description="새로운 항목을 추가해보세요"
        action="추가하기"
        onAction={handleAdd}
      />
    );
  }

  return <div>{/* 리스트 렌더링 */}</div>;
}
```

### Toast 알림

```tsx
import { useToast, Button } from '@design-system/components';

function ToastExample() {
  const toast = useToast();

  return (
    <div className="space-x-2">
      <Button onClick={() => toast.success('성공적으로 저장되었습니다')}>
        성공
      </Button>
      <Button onClick={() => toast.error('오류가 발생했습니다')}>
        에러
      </Button>
      <Button onClick={() => toast.info('정보를 확인하세요')}>
        정보
      </Button>
      <Button onClick={() => toast.warning('주의가 필요합니다')}>
        경고
      </Button>
    </div>
  );
}
```

---

## 네비게이션 패턴

### 페이지네이션

```tsx
import { Button } from '@design-system/components';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </Button>
    </div>
  );
}
```

### 탭 네비게이션

```tsx
import { Button } from '@design-system/components';

function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// 사용 예시
function TabExample() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '개요' },
    { id: 'details', label: '상세' },
    { id: 'settings', label: '설정' },
  ];

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <div className="p-4">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'details' && <Details />}
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  );
}
```

---

## 복합 패턴

### 대시보드

```tsx
import { Card, Typography, Badge } from '@design-system/components';

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding="md">
          <Typography variant="caption" color="secondary">
            총 사용자
          </Typography>
          <Typography variant="h2">1,234</Typography>
          <Badge variant="success" size="sm">
            +12%
          </Badge>
        </Card>
        <Card padding="md">
          <Typography variant="caption" color="secondary">
            활성 사용자
          </Typography>
          <Typography variant="h2">856</Typography>
          <Badge variant="success" size="sm">
            +8%
          </Badge>
        </Card>
        <Card padding="md">
          <Typography variant="caption" color="secondary">
            신규 가입
          </Typography>
          <Typography variant="h2">42</Typography>
          <Badge variant="warning" size="sm">
            -3%
          </Badge>
        </Card>
        <Card padding="md">
          <Typography variant="caption" color="secondary">
            매출
          </Typography>
          <Typography variant="h2">$12.5K</Typography>
          <Badge variant="success" size="sm">
            +15%
          </Badge>
        </Card>
      </div>

      {/* 최근 활동 */}
      <Card padding="lg">
        <Typography variant="h3" className="mb-4">
          최근 활동
        </Typography>
        <div className="space-y-3">
          {/* 활동 목록 */}
        </div>
      </Card>
    </div>
  );
}
```

---

**Design System** - 재사용 가능한 UI 패턴으로 빠른 개발
