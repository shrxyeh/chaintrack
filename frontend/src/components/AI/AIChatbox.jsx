import { useState, useRef, useEffect } from 'react';

export default function AIChatbox({ products = [], onInsightGenerated }) {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, insights]);

  // Mock data analysis based on query
  const analyzeQuery = (userQuery) => {
    const lowerQuery = userQuery.toLowerCase();
    const totalProducts = products.length || 1247;
    const deliveredProducts = Math.floor(totalProducts * 0.73);
    const inTransitProducts = Math.floor(totalProducts * 0.21);
    const createdProducts = totalProducts - deliveredProducts - inTransitProducts;

    // Generate insights based on query keywords
    let generatedInsights = [];

    if (lowerQuery.includes('delay') || lowerQuery.includes('late') || lowerQuery.includes('behind')) {
      generatedInsights = [
        {
          type: 'warning',
          title: 'Delay Analysis',
          metric: '12%',
          description: `${Math.floor(totalProducts * 0.12)} shipments are experiencing delays`,
          details: [
            'Weather conditions affecting 3 routes',
            'Port congestion causing 2-day average delay',
            'Peak season traffic increasing transit times by 15%'
          ],
          recommendation: 'Consider alternative routing for time-sensitive shipments'
        },
        {
          type: 'info',
          title: 'Delay Patterns',
          metric: 'Route 45',
          description: 'Most affected shipping corridor',
          details: [
            'Average delay: 2.3 days',
            'Affected shipments: 23',
            'Primary cause: Infrastructure maintenance'
          ],
          recommendation: 'Implement Route 67 as primary alternative'
        }
      ];
    } else if (lowerQuery.includes('efficiency') || lowerQuery.includes('performance') || lowerQuery.includes('optimize')) {
      generatedInsights = [
        {
          type: 'success',
          title: 'Supply Chain Efficiency',
          metric: '94.2%',
          description: 'Overall operational efficiency score',
          details: [
            'On-time delivery rate: 88%',
            'Inventory turnover: 12.3x annually',
            'Cost per shipment reduced by 8% this quarter'
          ],
          recommendation: 'Focus on last-mile optimization for further improvements'
        },
        {
          type: 'info',
          title: 'Optimization Opportunities',
          metric: '$2.4M',
          description: 'Potential annual savings identified',
          details: [
            'Route consolidation: $890K savings',
            'Warehouse automation: $1.1M savings',
            'Predictive maintenance: $410K savings'
          ],
          recommendation: 'Prioritize warehouse automation for highest ROI'
        }
      ];
    } else if (lowerQuery.includes('quality') || lowerQuery.includes('defect') || lowerQuery.includes('issue')) {
      generatedInsights = [
        {
          type: 'warning',
          title: 'Quality Metrics',
          metric: '2.8%',
          description: 'Current defect rate across all products',
          details: [
            'Electronics: 1.2% defect rate',
            'Food products: 4.1% defect rate',
            'Textiles: 2.3% defect rate'
          ],
          recommendation: 'Implement enhanced quality checks for food products'
        },
        {
          type: 'success',
          title: 'Quality Improvements',
          metric: '23%',
          description: 'Reduction in quality issues this quarter',
          details: [
            'New supplier vetting process implemented',
            'AI-powered quality prediction active',
            'Customer satisfaction up 15%'
          ],
          recommendation: 'Expand AI quality prediction to all product lines'
        }
      ];
    } else if (lowerQuery.includes('cost') || lowerQuery.includes('expense') || lowerQuery.includes('budget')) {
      generatedInsights = [
        {
          type: 'info',
          title: 'Cost Analysis',
          metric: '$1.2M',
          description: 'Total supply chain costs this month',
          details: [
            'Transportation: 45% ($540K)',
            'Warehousing: 30% ($360K)',
            'Technology: 25% ($300K)'
          ],
          recommendation: 'Negotiate better transportation rates for Q2'
        },
        {
          type: 'success',
          title: 'Cost Savings',
          metric: '12%',
          description: 'Cost reduction achieved this quarter',
          details: [
            'Fuel efficiency improvements: 8%',
            'Automated processes: 15% labor savings',
            'Bulk purchasing agreements: 5% material savings'
          ],
          recommendation: 'Continue automation initiatives for sustained savings'
        }
      ];
    } else if (lowerQuery.includes('predict') || lowerQuery.includes('forecast') || lowerQuery.includes('future')) {
      generatedInsights = [
        {
          type: 'info',
          title: 'Demand Forecast',
          metric: '+18%',
          description: 'Predicted demand increase next quarter',
          details: [
            'Electronics: +25% demand surge expected',
            'Seasonal products: +45% holiday boost',
            'Food products: +8% steady growth'
          ],
          recommendation: 'Increase inventory levels by 20% before Q4'
        },
        {
          type: 'warning',
          title: 'Risk Prediction',
          metric: '3 Risks',
          description: 'Potential supply chain disruptions identified',
          details: [
            'Supplier capacity constraints in Region A',
            'Weather-related delays predicted for Week 42',
            'Port strike possibility affecting 15% of shipments'
          ],
          recommendation: 'Develop contingency plans for identified risks'
        }
      ];
    } else if (lowerQuery.includes('inventory') || lowerQuery.includes('stock') || lowerQuery.includes('warehouse')) {
      generatedInsights = [
        {
          type: 'warning',
          title: 'Inventory Levels',
          metric: '23 Items',
          description: 'Products below optimal stock levels',
          details: [
            'Critical: 5 items (< 1 week supply)',
            'Low: 18 items (< 2 weeks supply)',
            'Average reorder time: 5.2 days'
          ],
          recommendation: 'Implement automated reorder triggers for critical items'
        },
        {
          type: 'success',
          title: 'Warehouse Efficiency',
          metric: '96.8%',
          description: 'Current warehouse utilization rate',
          details: [
            'Pick accuracy: 99.2%',
            'Average fulfillment time: 4.3 hours',
            'Storage optimization: 87% efficient'
          ],
          recommendation: 'Consider expanding Warehouse C capacity'
        }
      ];
    } else {
      // General insights for unrecognized queries
      generatedInsights = [
        {
          type: 'info',
          title: 'Supply Chain Overview',
          metric: `${totalProducts}`,
          description: 'Total products being tracked',
          details: [
            `Delivered: ${deliveredProducts} (${Math.round((deliveredProducts/totalProducts)*100)}%)`,
            `In Transit: ${inTransitProducts} (${Math.round((inTransitProducts/totalProducts)*100)}%)`,
            `Created: ${createdProducts} (${Math.round((createdProducts/totalProducts)*100)}%)`
          ],
          recommendation: 'Monitor in-transit products for potential delays'
        },
        {
          type: 'success',
          title: 'AI Analytics Status',
          metric: '94.7%',
          description: 'AI prediction accuracy this month',
          details: [
            'ETA predictions: 96.2% accurate',
            'Quality assessments: 93.8% accurate',
            'Risk predictions: 94.1% accurate'
          ],
          recommendation: 'AI models performing optimally across all metrics'
        }
      ];
    }

    return generatedInsights;
  };

  const handleGetInsights = async () => {
    if (!query.trim()) return;

    setIsAnalyzing(true);
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

    // Generate insights based on query
    const generatedInsights = analyzeQuery(query);
    
    // Add AI response to chat
    const aiMessage = {
      id: Date.now() + 1,
      type: 'ai',
      content: `I've analyzed your query about "${query}" and generated ${generatedInsights.length} relevant insights below.`,
      timestamp: new Date(),
      insights: generatedInsights
    };
    
    setChatHistory(prev => [...prev, aiMessage]);
    setInsights(generatedInsights);
    setQuery('');
    setIsAnalyzing(false);
    
    // Notify parent component
    onInsightGenerated?.(generatedInsights);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGetInsights();
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getInsightBgColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': 
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const suggestedQueries = [
    "What delays are affecting my shipments?",
    "How can I optimize supply chain efficiency?",
    "Show me quality metrics and issues",
    "Analyze cost trends and savings opportunities",
    "Predict future demand patterns",
    "Check inventory levels and warehouse status"
  ];

  return (
    <div className="walmart-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-walmart-gray-900 mb-2">AI Data Insights</h2>
        <p className="text-walmart-gray-600">Ask questions about your supply chain data and get AI-powered insights</p>
      </div>

      {/* Chat History */}
      {chatHistory.length > 0 && (
        <div className="mb-6 max-h-64 overflow-y-auto bg-gray-50 rounded-lg p-4 space-y-3">
          {chatHistory.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-walmart-blue-600 text-white' 
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-walmart-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      )}

      {/* Query Input */}
      <div className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about delays, efficiency, costs, quality, predictions, inventory..."
              className="walmart-input resize-none h-20"
              disabled={isAnalyzing}
            />
          </div>
          <button
            onClick={handleGetInsights}
            disabled={!query.trim() || isAnalyzing}
            className="walmart-btn-primary px-6 py-3 h-fit disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>Get Insights</span>
              </>
            )}
          </button>
        </div>

        {/* Suggested Queries */}
        {chatHistory.length === 0 && (
          <div className="mt-4">
            <p className="text-sm text-walmart-gray-600 mb-2">Try asking about:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(suggestion)}
                  className="text-xs bg-walmart-blue-100 text-walmart-blue-700 px-3 py-1 rounded-full hover:bg-walmart-blue-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Generated Insights */}
      {insights.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-walmart-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="text-lg font-bold text-walmart-gray-900">AI-Generated Insights</h3>
          </div>

          {insights.map((insight, index) => (
            <div
              key={index}
              className={`border rounded-lg p-6 ${getInsightBgColor(insight.type)} animate-fade-in`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getInsightIcon(insight.type)}
                  <div>
                    <h4 className="text-lg font-bold text-walmart-gray-900">{insight.title}</h4>
                    <p className="text-walmart-gray-700">{insight.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-walmart-blue-600">{insight.metric}</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {insight.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm text-walmart-gray-700">
                    <div className="w-2 h-2 bg-walmart-blue-500 rounded-full"></div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white bg-opacity-50 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-walmart-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-walmart-gray-900">AI Recommendation</p>
                    <p className="text-sm text-walmart-gray-700">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analysis Status */}
      {isAnalyzing && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-3 text-walmart-blue-600">
            <svg className="animate-spin w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="font-medium">AI is analyzing your data...</span>
          </div>
          <p className="text-sm text-walmart-gray-600 mt-2">Processing supply chain patterns and generating insights</p>
        </div>
      )}
    </div>
  );
}