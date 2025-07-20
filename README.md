# Calculator Mobile App

A comprehensive calculator mobile app built with React Native and Expo, featuring all mathematical operations and calculation history.

## Features

### Mathematical Operations
- **Basic Operations**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Advanced Operations**: 
  - Modulo (%)
  - Exponentiation (x^y)
  - Square (x²)
  - Square Root (√)
  - Reciprocal (1/x)
- **Additional Features**:
  - Sign change (±)
  - Decimal point support
  - Clear function (C)

### History Functionality
- **Calculation History**: Automatically saves the last 10 calculations
- **History View**: Accessible via the "History" button in the header
- **History Features**:
  - View expression and result
  - Timestamp for each calculation
  - Tap any history item to use the result
  - Clear all history
  - Back navigation to calculator

### User Interface
- **Modern Dark Theme**: Sleek dark interface with orange accent colors
- **Responsive Design**: Optimized for mobile screens
- **Intuitive Layout**: Calculator-style button arrangement
- **Real-time Display**: Shows current operation and previous value

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd CalculatorApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

### Running the App

#### On Android:
```bash
npm run android
```

#### On iOS (requires macOS):
```bash
npm run ios
```

#### On Web:
```bash
npm run web
```

#### Using Expo Go App:
1. Install Expo Go on your mobile device
2. Scan the QR code displayed in the terminal
3. The app will load on your device

## How to Use

### Basic Calculations
1. Enter the first number using the number pad
2. Tap an operation button (+, -, ×, ÷)
3. Enter the second number
4. Tap "=" to see the result

### Advanced Operations
- **Square**: Enter a number and tap "x²"
- **Square Root**: Enter a number and tap "√"
- **Reciprocal**: Enter a number and tap "1/x"
- **Exponentiation**: Enter base number, tap "x^y", enter exponent, tap "="
- **Modulo**: Enter first number, tap "%", enter second number, tap "="

### History Features
1. Tap "History" in the header to view calculation history
2. Tap any history item to use that result in a new calculation
3. Tap "Clear" to remove all history
4. Tap "← Back" to return to the calculator

## Technical Details

### Built With
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Hooks**: State management

### State Management
The app uses React hooks for state management:
- `useState` for local component state
- History stored in component state (in-memory)

### File Structure
```
CalculatorApp/
├── App.tsx          # Main calculator component
├── package.json     # Dependencies and scripts
├── README.md        # This file
└── ...              # Other Expo configuration files
```

## Future Enhancements

Potential improvements for future versions:
- Persistent storage for history (AsyncStorage)
- Scientific calculator functions
- Unit conversions
- Currency calculator
- Theme customization
- Landscape orientation support
- Voice input support

## Contributing

Feel free to submit issues and enhancement requests!
