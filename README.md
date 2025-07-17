# 📈 Stock Market Predictor

A powerful web-based stock market prediction application that analyzes stock price trends and provides visual predictions using moving averages and machine learning concepts.

## 🚀 Live Demo

**[View Live Application](https://rohan911438.github.io/Stock-price-prediction/)**

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Charts & Visualizations](#charts--visualizations)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔍 **Stock Analysis**
- Real-time stock symbol input
- Historical data visualization
- Moving average calculations (MA50, MA100, MA200)
- Price prediction simulation

### 📊 **Interactive Charts**
- **Price vs MA50**: 50-day moving average analysis
- **Price vs MA50 vs MA100**: Comparison of short and medium-term trends
- **Price vs MA100 vs MA200**: Medium and long-term trend analysis
- **Original vs Predicted Prices**: ML-based prediction visualization

### 💻 **User Experience**
- Clean, responsive design
- Real-time data processing
- Interactive charts with Chart.js
- Mobile-friendly interface
- Error handling and loading states

## 🛠 Technologies Used

### Frontend
- **HTML5** - Structure and semantics
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Interactive functionality
- **Chart.js** - Data visualization
- **TensorFlow.js** - ML framework integration

### Backend Simulation
- Mock data generation for demonstration
- Mathematical calculations for moving averages
- Prediction algorithms simulation

### Libraries & APIs
- [Chart.js](https://www.chartjs.org/) - For creating interactive charts
- [TensorFlow.js](https://www.tensorflow.org/js) - For ML capabilities
- Alpha Vantage API (configurable) - For real stock data

## 🔧 Installation

### Option 1: Direct Usage (Recommended)
1. **Clone the repository:**
   ```bash
   git clone https://github.com/rohan911438/Stock-price-prediction.git
   cd Stock-price-prediction
   ```

2. **Open in browser:**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   python -m http.server 8000  # For local server
   ```

### Option 2: GitHub Pages Deployment
1. **Fork/Clone this repository**
2. **Go to Settings → Pages**
3. **Enable GitHub Pages from main branch**
4. **Access at:** `https://yourusername.github.io/Stock-price-prediction/`

## 📖 Usage

### Basic Usage
1. **Enter Stock Symbol**: Type any stock symbol (e.g., AAPL, GOOGL, MSFT, TSLA)
2. **Click "Get Stock Data & Predict"**: Process data and generate predictions
3. **View Results**: Analyze charts and data table
4. **Try Different Symbols**: Experiment with various stocks

### Supported Stock Symbols
- **Technology**: AAPL, GOOGL, MSFT, TSLA, AMZN, META
- **Finance**: JPM, BAC, WFC, GS
- **Healthcare**: JNJ, PFE, UNH
- **And many more!**

## 🔬 How It Works

### Data Processing Pipeline
1. **Input Processing**: Validates stock symbol input
2. **Data Generation**: Creates realistic stock data simulation
3. **Moving Averages**: Calculates MA50, MA100, MA200
4. **Prediction Algorithm**: Simulates ML predictions with trend analysis
5. **Visualization**: Renders interactive charts

### Technical Implementation
```javascript
// Example: Moving Average Calculation
function calculateMA(data, period) {
    const ma = [];
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            ma.push(null);
        } else {
            const sum = data.slice(i - period + 1, i + 1)
                           .reduce((a, b) => a + b.close, 0);
            ma.push(sum / period);
        }
    }
    return ma;
}
```

### Prediction Logic
- Uses time series analysis concepts
- Incorporates trend detection
- Simulates neural network predictions
- Applies realistic market volatility

## 📊 Charts & Visualizations

### Chart Types
1. **Price vs MA50**
   - Shows current price against 50-day moving average
   - Helps identify short-term trends

2. **Price vs MA50 vs MA100**
   - Compares short-term (50-day) vs medium-term (100-day) trends
   - Useful for swing trading analysis

3. **Price vs MA100 vs MA200**
   - Long-term trend analysis
   - Ideal for investment decisions

4. **Original vs Predicted Prices**
   - Shows model predictions vs actual prices
   - Demonstrates prediction accuracy

### Chart Features
- **Interactive**: Hover for detailed data points
- **Responsive**: Works on desktop and mobile
- **Customizable**: Easy to modify colors and styles
- **Exportable**: Can be saved as images

## 🔌 API Integration

### Current Implementation
- Uses mock data for demonstration
- Generates realistic stock price patterns
- Simulates market volatility

### Real API Integration (Optional)
To use real stock data, you can integrate with:

#### Alpha Vantage API
```javascript
const API_KEY = 'YOUR_API_KEY';
const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
```

#### Yahoo Finance API
```javascript
// Alternative free option
const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Steps to Contribute
1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Areas for Contribution
- Real-time stock data integration
- Additional chart types
- Mobile app development
- Performance optimizations
- UI/UX improvements
- Testing framework
- Documentation improvements

## 📝 Development Notes

### Python Version (Legacy)
This project was originally developed in Python using:
- **Streamlit** - Web framework
- **yfinance** - Stock data API
- **TensorFlow/Keras** - Machine learning
- **Pandas/NumPy** - Data processing
- **Matplotlib** - Visualization

### JavaScript Version (Current)
Migrated to JavaScript for:
- Better web compatibility
- No installation requirements
- Faster deployment
- Cross-platform support

> **Note:** The `app.py` file is kept for reference and portfolio purposes. The live web application uses only `index.html` and requires no Python installation.

## 🚀 Future Enhancements

### Planned Features
- [ ] Real-time stock data integration
- [ ] User portfolio tracking
- [ ] Advanced prediction models
- [ ] Social trading features
- [ ] Mobile app version
- [ ] API for developers
- [ ] Premium features

### Technical Improvements
- [ ] Performance optimization
- [ ] Better error handling
- [ ] Offline capability
- [ ] Progressive Web App (PWA)
- [ ] Advanced analytics

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhinav Kumar** ([@rohan911438](https://github.com/rohan911438))

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/rohan911438/Stock-price-prediction/issues)
- **Discussions**: [GitHub Discussions](https://github.com/rohan911438/Stock-price-prediction/discussions)
- **Email**: [Contact Developer](mailto:your.email@example.com)

## 🙏 Acknowledgments

- **Chart.js** - For amazing charting capabilities
- **TensorFlow.js** - For ML framework
- **GitHub Pages** - For free hosting
- **Stock Market Data Providers** - For inspiration

---

⭐ **If you find this project helpful, please give it a star!** ⭐

**[Visit Live Application](https://rohan911438.github.io/Stock-price-prediction/)**
