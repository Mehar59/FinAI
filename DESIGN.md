# Financial Freedom Planner - Design & Architecture

## Design System

### Color Palette
- **Primary**: `#2563eb` (Blue) - Main actions, progress indicators
- **Secondary**: `#10b981` (Green) - Success, positive financial metrics
- **Accent**: `#f59e0b` (Amber) - Warnings, important alerts
- **Danger**: `#ef4444` (Red) - Risks, negative metrics
- **Neutral**: `#6b7280` (Gray) - Secondary text, borders

### Typography
- **Font Family**: Inter (system font fallback)
- **Headings**: Bold, 24px-32px
- **Body**: Regular, 14px-16px
- **Labels**: Medium, 12px-14px

### Spacing System
- Base unit: 4px
- Padding: 8px, 12px, 16px, 24px, 32px
- Margins: 8px, 12px, 16px, 24px, 32px

## Data Model

### User Session Data
```typescript
interface UserData {
  cashFlow: {
    monthlyIncome: number;
    monthlyExpenses: Record<string, number>;
    totalExpenses: number;
    netCashFlow: number;
  };
  
  netWorth: {
    assets: Record<string, number>;
    liabilities: Record<string, number>;
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
  };
  
  goals: Array<{
    id: string;
    name: string;
    targetAmount: number;
    timeline: number; // months
    category: string;
    priority: number;
  }>;
  
  riskAssessment: {
    riskTolerance: number; // 1-10
    riskCapacity: number; // 1-10
    overallRiskProfile: string; // Conservative, Moderate, Aggressive
  };
  
  wealthProtection: {
    cyberAwareness: number; // 1-10
    emergencyFundMonths: number;
    insuranceNeeds: Record<string, boolean>;
    protectionScore: number;
  };
  
  personalInfo: {
    age: number;
    income: number;
    expenses: number;
  };
}
```

## API Integration with N8N

### Request Format
```json
{
  "userData": {
    "age": 30,
    "monthlyIncome": 50000,
    "monthlyExpenses": 25000,
    "totalAssets": 500000,
    "totalLiabilities": 100000,
    "riskTolerance": 7,
    "riskCapacity": 8,
    "cyberAwareness": 6,
    "financialGoals": [...]
  }
}
```

### Response Format
```json
{
  "recommendations": {
    "equityAllocation": 60,
    "debtAllocation": 40,
    "mutualFunds": [
      {
        "name": "Fund Name",
        "type": "Equity/Debt/Hybrid",
        "allocation": 25,
        "riskLevel": "High/Medium/Low"
      }
    ],
    "commodities": [
      {
        "name": "Gold",
        "allocation": 10,
        "reasoning": "..."
      }
    ],
    "cryptocurrency": [
      {
        "name": "Bitcoin",
        "allocation": 5,
        "reasoning": "..."
      }
    ],
    "emergencyFund": 150000,
    "investmentStrategy": "..."
  }
}
```

## Component Structure

### Pages
- `Home.tsx` - Landing/intro page
- `StepContainer.tsx` - Multi-step form wrapper
- `Step1CashFlow.tsx` - Income/expenses tracking
- `Step2NetWorth.tsx` - Assets/liabilities
- `Step3Goals.tsx` - Financial goals
- `Step4RiskAssessment.tsx` - Risk evaluation
- `Step5WealthProtection.tsx` - Insurance & emergency fund
- `Step6Plan.tsx` - AI recommendations display
- `Step7Track.tsx` - Monthly tracking
- `Step8Status.tsx` - Dashboard with charts

### Reusable Components
- `FormInput.tsx` - Text input with validation
- `FormSelect.tsx` - Dropdown selector
- `FormSlider.tsx` - Range slider for ratings
- `FormTable.tsx` - Table for adding/editing items
- `ProgressBar.tsx` - Step progress indicator
- `Card.tsx` - Content container
- `Button.tsx` - Action buttons
- `Chart.tsx` - Chart wrapper (using Chart.js or similar)

## State Management

### localStorage Keys
- `ffp_cashFlow` - Cash flow data
- `ffp_netWorth` - Net worth data
- `ffp_goals` - Financial goals
- `ffp_riskAssessment` - Risk profile
- `ffp_wealthProtection` - Protection assessment
- `ffp_recommendations` - AI recommendations
- `ffp_trackingHistory` - Monthly tracking records
- `ffp_currentStep` - Current step in journey

## User Flow

1. User lands on home page
2. Clicks "Start Your Journey"
3. Completes Step 1: Cash Flow Tracking
4. Completes Step 2: Net Worth Calculation
5. Completes Step 3: Financial Goals
6. Completes Step 4: Risk Assessment
7. Completes Step 5: Wealth Protection
8. Submits data to N8N workflow
9. Views Step 6: AI-Generated Plan
10. Uses Step 7: Monthly Tracking
11. Views Step 8: Financial Dashboard

## Responsive Design Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Accessibility Standards
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader friendly labels
- Color contrast ratios ≥ 4.5:1
- Focus indicators on all interactive elements
