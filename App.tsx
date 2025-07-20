import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

export default function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '%':
        return firstValue % secondValue;
      case '^':
        return Math.pow(firstValue, secondValue);
      default:
        return secondValue;
    }
  };

  const calculateResult = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      const expression = `${previousValue} ${operation} ${inputValue}`;
      
      // Add to history
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        expression,
        result: String(result),
        timestamp: new Date(),
      };
      
      setHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10 items
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const useHistoryItem = (item: HistoryItem) => {
    setDisplay(item.result);
    setShowHistory(false);
  };

  const formatDisplay = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    if (num === 0) return '0';
    if (Math.abs(num) < 0.000001) return '0';
    if (Math.abs(num) >= 1e9) return num.toExponential(2);
    
    return num.toString();
  };

  const Button = ({ title, onPress, style, textStyle }: any) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );

  if (showHistory) {
    return (
      <SafeAreaView style={styles.container}>
        <ExpoStatusBar style="light" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowHistory(false)}>
            <Text style={styles.headerButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>History</Text>
          <TouchableOpacity onPress={clearHistory}>
            <Text style={styles.headerButton}>Clear</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.historyContainer}>
          {history.length === 0 ? (
            <Text style={styles.noHistory}>No calculations yet</Text>
          ) : (
            history.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.historyItem}
                onPress={() => useHistoryItem(item)}
              >
                <Text style={styles.historyExpression}>{item.expression}</Text>
                <Text style={styles.historyResult}>= {item.result}</Text>
                <Text style={styles.historyTime}>
                  {item.timestamp.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calculator</Text>
        <TouchableOpacity onPress={() => setShowHistory(true)}>
          <Text style={styles.headerButton}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{formatDisplay(display)}</Text>
        {operation && (
          <Text style={styles.operationText}>
            {previousValue} {operation}
          </Text>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <Button title="C" onPress={clearAll} style={styles.clearButton} />
          <Button title="±" onPress={() => setDisplay(String(-parseFloat(display)))} />
          <Button title="%" onPress={() => performOperation('%')} />
          <Button title="÷" onPress={() => performOperation('÷')} style={styles.operatorButton} />
        </View>

        <View style={styles.buttonRow}>
          <Button title="7" onPress={() => inputDigit('7')} />
          <Button title="8" onPress={() => inputDigit('8')} />
          <Button title="9" onPress={() => inputDigit('9')} />
          <Button title="×" onPress={() => performOperation('×')} style={styles.operatorButton} />
        </View>

        <View style={styles.buttonRow}>
          <Button title="4" onPress={() => inputDigit('4')} />
          <Button title="5" onPress={() => inputDigit('5')} />
          <Button title="6" onPress={() => inputDigit('6')} />
          <Button title="-" onPress={() => performOperation('-')} style={styles.operatorButton} />
        </View>

        <View style={styles.buttonRow}>
          <Button title="1" onPress={() => inputDigit('1')} />
          <Button title="2" onPress={() => inputDigit('2')} />
          <Button title="3" onPress={() => inputDigit('3')} />
          <Button title="+" onPress={() => performOperation('+')} style={styles.operatorButton} />
        </View>

        <View style={styles.buttonRow}>
          <Button title="0" onPress={() => inputDigit('0')} style={styles.zeroButton} />
          <Button title="." onPress={inputDecimal} />
          <Button title="=" onPress={calculateResult} style={styles.equalsButton} />
        </View>

        <View style={styles.buttonRow}>
          <Button title="x²" onPress={() => {
            const value = parseFloat(display);
            const result = value * value;
            setDisplay(String(result));
            setWaitingForOperand(true);
          }} />
          <Button title="√" onPress={() => {
            const value = parseFloat(display);
            const result = Math.sqrt(value);
            setDisplay(String(result));
            setWaitingForOperand(true);
          }} />
          <Button title="1/x" onPress={() => {
            const value = parseFloat(display);
            const result = 1 / value;
            setDisplay(String(result));
            setWaitingForOperand(true);
          }} />
          <Button title="x^y" onPress={() => performOperation('^')} style={styles.operatorButton} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  displayText: {
    fontSize: 48,
    fontWeight: '300',
    color: '#fff',
    textAlign: 'right',
  },
  operationText: {
    fontSize: 24,
    color: '#888',
    marginTop: 10,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 70,
    marginHorizontal: 5,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  operatorButton: {
    backgroundColor: '#FF9500',
  },
  equalsButton: {
    backgroundColor: '#007AFF',
  },
  zeroButton: {
    flex: 2,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  historyItem: {
    backgroundColor: '#333',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  historyExpression: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  historyResult: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  historyTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  noHistory: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});
