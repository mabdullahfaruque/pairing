# Hello Component

Renders a customizable greeting message.

## Usage

```tsx
import { Hello } from './Hello';

<Hello name="Alice" />
<Hello name="Bob" greeting="Hi" />
```

## Props

| Name     | Type   | Required | Description           |
|----------|--------|----------|-----------------------|
| name     | string | Yes      | The name to greet     |
| greeting | string | No       | Custom greeting text  |
