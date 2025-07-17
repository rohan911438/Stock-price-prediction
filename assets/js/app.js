/**
 * Stock Market Predictor - Main JavaScript File
 * Author: Abhinav Kumar
 * Description: Handles stock data fetching, processing, and visualization
 */

// Global variables
let stockData = [];
let predictions = [];
let chartInstances = {};

/**
 * Main function to fetch and process stock data
 */
async function fetchStockData() {
    const symbol = document.getElementById('stockSymbol').value.toUpperCase();
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Validate input
    if (!symbol) {
        showError('Please enter a stock symbol');
        return;
    }

    // Show loading state
    showLoading(true);
    hideError();
    
    try {
        // Generate mock data for demonstration
        const mockData = generateMockStockData(symbol);
        stockData = mockData;
        
        // Process and visualize data
        await processStockData();
        await createCharts();
        await generatePredictions();
        
        // Hide loading state
        showLoading(false);
        
        // Add fade-in animation
        document.getElementById('stockDataContainer').classList.add('fade-in');
        document.getElementById('chartsContainer').classList.add('fade-in');
        
    } catch (error) {
        console.error('Error processing stock data:', error);
        showError('Failed to process stock data. Please try again.');
        showLoading(false);
    }
}

/**
 * Generate realistic mock stock data for demonstration
 * @param {string} symbol - Stock symbol
 * @returns {Array} Array of stock data objects
 */
function generateMockStockData(symbol) {
    console.log(`Generating mock data for ${symbol}`);
    
    const data = [];
    const startDate = new Date('2012-01-01');
    const endDate = new Date('2022-12-31');
    
    // Determine base price based on symbol
    let basePrice = getBasePriceForSymbol(symbol);
    let currentPrice = basePrice;
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        // Generate realistic price movement with trend
        const dailyChange = generatePriceChange(date, symbol);
        currentPrice = Math.max(currentPrice * (1 + dailyChange), 0.01); // Prevent negative prices
        
        data.push({
            date: new Date(date),
            close: currentPrice,
            open: currentPrice * (1 + (Math.random() - 0.5) * 0.02),
            high: currentPrice * (1 + Math.random() * 0.03),
            low: currentPrice * (1 - Math.random() * 0.03),
            volume: generateVolume(symbol)
        });
    }
    
    return data;
}

/**
 * Get base price for different stock symbols
 * @param {string} symbol - Stock symbol
 * @returns {number} Base price
 */
function getBasePriceForSymbol(symbol) {
    const priceMap = {
        'AAPL': 150, 'GOOGL': 2800, 'MSFT': 300, 'TSLA': 800, 'AMZN': 3200,
        'META': 200, 'NVDA': 400, 'NFLX': 500,
        'RELIANCE': 2500, 'TCS': 3200, 'INFY': 1500, 'HDFCBANK': 1600,
        'ICICIBANK': 800, 'SBIN': 500, 'ITC': 250, 'HINDUNILVR': 2400,
        'ASIANPAINT': 3000, 'MARUTI': 9000
    };
    
    return priceMap[symbol] || (Math.random() * 1000 + 50);
}

/**
 * Generate realistic price change based on market conditions
 * @param {Date} date - Current date
 * @param {string} symbol - Stock symbol
 * @returns {number} Price change percentage
 */
function generatePriceChange(date, symbol) {
    const year = date.getFullYear();
    const dayOfYear = Math.floor((date - new Date(year, 0, 0)) / 86400000);
    
    // Base volatility
    let volatility = 0.02;
    
    // Market events simulation
    if (year === 2020 && dayOfYear > 60 && dayOfYear < 120) {
        volatility = 0.08; // COVID-19 market crash
    } else if (year === 2008 && dayOfYear > 240) {
        volatility = 0.06; // Financial crisis
    }
    
    // Add weekly patterns
    const weeklyTrend = Math.sin(dayOfYear / 7) * 0.005;
    
    // Random walk with drift
    const drift = 0.0002; // Slight upward trend
    const randomComponent = (Math.random() - 0.5) * volatility;
    
    return drift + weeklyTrend + randomComponent;
}

/**
 * Generate trading volume
 * @param {string} symbol - Stock symbol
 * @returns {number} Trading volume
 */
function generateVolume(symbol) {
    const baseVolumes = {
        'AAPL': 50000000, 'GOOGL': 1500000, 'MSFT': 30000000,
        'RELIANCE': 5000000, 'TCS': 3000000, 'INFY': 8000000
    };
    
    const baseVolume = baseVolumes[symbol] || 2000000;
    return Math.floor(baseVolume * (0.5 + Math.random()));
}

/**
 * Process stock data and display table
 */
async function processStockData() {
    const container = document.getElementById('stockDataContainer');
    const tableContainer = document.getElementById('stockDataTable');
    
    // Show recent data (last 10 days)
    const recentData = stockData.slice(-10);
    
    let tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    recentData.forEach(row => {
        tableHTML += `
            <tr>
                <td>${row.date.toLocaleDateString()}</td>
                <td>$${row.open.toFixed(2)}</td>
                <td>$${row.high.toFixed(2)}</td>
                <td>$${row.low.toFixed(2)}</td>
                <td>$${row.close.toFixed(2)}</td>
                <td>${row.volume.toLocaleString()}</td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    container.style.display = 'block';
}

/**
 * Calculate moving averages
 * @param {Array} data - Stock data array
 * @param {number} period - Period for moving average
 * @returns {Array} Moving average values
 */
function calculateMA(data, period) {
    const ma = [];
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            ma.push(null);
        } else {
            const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b.close, 0);
            ma.push(sum / period);
        }
    }
    return ma;
}

/**
 * Create all charts
 */
async function createCharts() {
    const container = document.getElementById('chartsContainer');
    container.style.display = 'block';
    
    const prices = stockData.map(d => d.close);
    const dates = stockData.map(d => d.date.toLocaleDateString());
    const ma50 = calculateMA(stockData, 50);
    const ma100 = calculateMA(stockData, 100);
    const ma200 = calculateMA(stockData, 200);
    
    // Create charts with improved styling
    const chartConfig = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index'
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time Period',
                    font: { weight: 'bold' }
                },
                grid: { color: 'rgba(0,0,0,0.1)' }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Price ($)',
                    font: { weight: 'bold' }
                },
                grid: { color: 'rgba(0,0,0,0.1)' }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: { usePointStyle: true }
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1
            }
        }
    };
    
    // Chart 1: Price vs MA50
    createChart('ma50Chart', {
        labels: dates,
        datasets: [
            {
                label: 'Stock Price',
                data: prices,
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            },
            {
                label: 'MA50',
                data: ma50,
                borderColor: '#FF5722',
                backgroundColor: 'rgba(255, 87, 34, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }
        ]
    }, chartConfig);
    
    // Chart 2: Price vs MA50 vs MA100
    createChart('ma100Chart', {
        labels: dates,
        datasets: [
            {
                label: 'Stock Price',
                data: prices,
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            },
            {
                label: 'MA50',
                data: ma50,
                borderColor: '#FF5722',
                backgroundColor: 'rgba(255, 87, 34, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            },
            {
                label: 'MA100',
                data: ma100,
                borderColor: '#9C27B0',
                backgroundColor: 'rgba(156, 39, 176, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }
        ]
    }, chartConfig);
    
    // Chart 3: Price vs MA100 vs MA200
    createChart('ma200Chart', {
        labels: dates,
        datasets: [
            {
                label: 'Stock Price',
                data: prices,
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            },
            {
                label: 'MA100',
                data: ma100,
                borderColor: '#9C27B0',
                backgroundColor: 'rgba(156, 39, 176, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            },
            {
                label: 'MA200',
                data: ma200,
                borderColor: '#607D8B',
                backgroundColor: 'rgba(96, 125, 139, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }
        ]
    }, chartConfig);
}

/**
 * Generate predictions using mock ML algorithm
 */
async function generatePredictions() {
    const testData = stockData.slice(-300); // Last 300 days for prediction
    const actualPrices = testData.map(d => d.close);
    
    // Enhanced mock prediction logic
    const predictedPrices = actualPrices.map((price, index) => {
        const noise = (Math.random() - 0.5) * 0.03;
        const trend = Math.sin(index * 0.05) * 0.015;
        const momentum = index > 50 ? (actualPrices[index] - actualPrices[index - 50]) / actualPrices[index - 50] * 0.1 : 0;
        
        return price * (1 + noise + trend + momentum);
    });
    
    predictions = predictedPrices;
    
    // Create prediction chart
    const testDates = testData.map(d => d.date.toLocaleDateString());
    createChart('predictionChart', {
        labels: testDates,
        datasets: [
            {
                label: 'Actual Price',
                data: actualPrices,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            },
            {
                label: 'Predicted Price',
                data: predictedPrices,
                borderColor: '#FF9800',
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1,
                borderDash: [5, 5]
            }
        ]
    }, {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index'
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time Period',
                    font: { weight: 'bold' }
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Price ($)',
                    font: { weight: 'bold' }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: { usePointStyle: true }
            }
        }
    });
}

/**
 * Create individual chart
 * @param {string} canvasId - Canvas element ID
 * @param {Object} data - Chart data
 * @param {Object} options - Chart options
 */
function createChart(canvasId, data, options = {}) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Destroy existing chart if it exists
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    
    // Default options
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Price ($)'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    };
    
    chartInstances[canvasId] = new Chart(ctx, {
        type: 'line',
        data: data,
        options: { ...defaultOptions, ...options }
    });
}

/**
 * Show/hide loading state
 * @param {boolean} show - Whether to show loading
 */
function showLoading(show) {
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = show ? 'block' : 'none';
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

/**
 * Hide error message
 */
function hideError() {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.style.display = 'none';
}

/**
 * Initialize application
 */
function initializeApp() {
    console.log('Stock Market Predictor initialized');
    
    // Add enter key support for input
    document.getElementById('stockSymbol').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            fetchStockData();
        }
    });
    
    // Load default stock data
    fetchStockData();
}

// Initialize when page loads
window.addEventListener('load', initializeApp);
