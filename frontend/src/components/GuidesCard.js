import React, { useState, useEffect, useCallback } from "react";

// Mock API function for demonstration
const fetchGuides = async (topic = "") => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allGuides = [
    {
      id: 1,
      title: "Integrated Pest Management for Wheat",
      content: "Learn effective strategies to control pests in wheat crops using sustainable methods. Includes identification, prevention, and treatment techniques.",
      category: "pest control",
      readTime: "5 min read",
      difficulty: "Beginner",
      tags: ["wheat", "pests", "IPM", "sustainable"]
    },
    {
      id: 2,
      title: "Soil Health Management Practices",
      content: "Comprehensive guide on maintaining soil fertility through organic matter, crop rotation, and proper nutrient management.",
      category: "soil management",
      readTime: "8 min read",
      difficulty: "Intermediate",
      tags: ["soil", "fertility", "organic", "rotation"]
    },
    {
      id: 3,
      title: "Water-Efficient Irrigation Techniques",
      content: "Modern irrigation methods to maximize water use efficiency including drip irrigation, sprinkler systems, and smart scheduling.",
      category: "irrigation",
      readTime: "6 min read",
      difficulty: "Intermediate",
      tags: ["irrigation", "water", "efficiency", "drip"]
    },
    {
      id: 4,
      title: "Organic Fertilizer Application Guide",
      content: "Step-by-step instructions for preparing and applying organic fertilizers to improve crop yield naturally.",
      category: "fertilizers",
      readTime: "4 min read",
      difficulty: "Beginner",
      tags: ["organic", "fertilizer", "yield", "natural"]
    },
    {
      id: 5,
      title: "Disease Prevention in Rice Cultivation",
      content: "Identify and prevent common rice diseases through proper field management, resistant varieties, and timely interventions.",
      category: "disease control",
      readTime: "7 min read",
      difficulty: "Advanced",
      tags: ["rice", "disease", "prevention", "varieties"]
    },
    {
      id: 6,
      title: "Post-Harvest Storage Best Practices",
      content: "Essential techniques for proper grain storage to minimize losses and maintain quality during storage periods.",
      category: "post harvest",
      readTime: "5 min read",
      difficulty: "Beginner",
      tags: ["storage", "grain", "quality", "losses"]
    }
  ];

  // Filter guides based on topic
  if (!topic.trim()) return allGuides;
  
  const searchTerm = topic.toLowerCase();
  return allGuides.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm) ||
    guide.content.toLowerCase().includes(searchTerm) ||
    guide.category.toLowerCase().includes(searchTerm) ||
    guide.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

const POPULAR_TOPICS = [
  { label: "Pest Control", value: "pest control", icon: "🐛" },
  { label: "Soil Management", value: "soil management", icon: "🌱" },
  { label: "Irrigation", value: "irrigation", icon: "💧" },
  { label: "Disease Control", value: "disease control", icon: "🔬" },
  { label: "Fertilizers", value: "fertilizers", icon: "🧪" },
  { label: "Post Harvest", value: "post harvest", icon: "🌾" }
];

export default function GuidesSection() {
  const [searchTopic, setSearchTopic] = useState("");
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadGuides = useCallback(async (topic = "") => {
    setIsLoading(true);
    setError(null);
    
    try {
      const guidesData = await fetchGuides(topic);
      setGuides(guidesData);
    } catch (err) {
      console.error("Failed to load guides:", err);
      setError("Failed to load guides. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load initial guides on component mount
  useEffect(() => {
    loadGuides();
  }, [loadGuides]);

  const handleSearch = () => {
    loadGuides(searchTopic);
  };

  const handleTopicClick = (topic) => {
    setSearchTopic(topic);
    loadGuides(topic);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'pest control': '🐛',
      'soil management': '🌱',
      'irrigation': '💧',
      'disease control': '🔬',
      'fertilizers': '🧪',
      'post harvest': '🌾'
    };
    return iconMap[category.toLowerCase()] || '📖';
  };

  return (
    <>
      <style>{`
        .guides-section {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 12px;
          margin: 1.5rem 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .guides-header {
          margin-bottom: 1.5rem;
        }

        .guides-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 1rem 0;
        }

        .search-container {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .search-input {
          flex: 1;
          min-width: 200px;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          background: white;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .search-btn {
          background: #22c55e;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .search-btn:hover:not(:disabled) {
          background: #16a34a;
          transform: translateY(-1px);
        }

        .search-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .loading-spinner {
          display: inline-block;
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .topic-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .topic-chip {
          background: white;
          border: 1px solid #e5e7eb;
          color: #374151;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .topic-chip:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .topic-chip.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .guides-grid {
          display: grid;
          gap: 1rem;
        }

        .guide-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
          border-left: 4px solid #e5e7eb;
        }

        .guide-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-left-color: #3b82f6;
        }

        .guide-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          gap: 1rem;
        }

        .guide-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          line-height: 1.4;
        }

        .guide-category {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: #6b7280;
          white-space: nowrap;
        }

        .guide-content {
          color: #4b5563;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .guide-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .guide-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.75rem;
          color: #6b7280;
        }

        .read-time {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .difficulty-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .guide-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          margin-top: 0.5rem;
        }

        .tag {
          background: #f3f4f6;
          color: #374151;
          padding: 0.125rem 0.375rem;
          border-radius: 8px;
          font-size: 0.625rem;
          font-weight: 500;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #6b7280;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .empty-description {
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .error-state {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 1rem;
          color: #dc2626;
          font-size: 0.875rem;
          text-align: center;
          margin: 1rem 0;
        }

        .results-count {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 1rem;
        }

        @media (max-width: 640px) {
          .search-container {
            flex-direction: column;
          }
          
          .search-input {
            min-width: unset;
          }
          
          .guide-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .guide-meta {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="guides-section">
        <div className="guides-header">
          <h2 className="guides-title">Guides</h2>
          
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Filter by topic (e.g., pest control)"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="search-btn"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading && <span className="loading-spinner"></span>}
              {isLoading ? "Searching..." : "Search Guides"}
            </button>
          </div>

          <div className="topic-filters">
            {POPULAR_TOPICS.map((topic) => (
              <button
                key={topic.value}
                className={`topic-chip ${searchTopic === topic.value ? 'active' : ''}`}
                onClick={() => handleTopicClick(topic.value)}
              >
                <span>{topic.icon}</span>
                <span>{topic.label}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="error-state">{error}</div>
        )}

        {!error && !isLoading && guides.length > 0 && (
          <div className="results-count">
            Found {guides.length} guide{guides.length !== 1 ? 's' : ''}
            {searchTopic && ` for "${searchTopic}"`}
          </div>
        )}

        <div className="guides-grid">
          {isLoading ? (
            <div className="empty-state">
              <div className="empty-icon">⏳</div>
              <div className="empty-title">Loading guides...</div>
              <div className="empty-description">Please wait while we fetch the latest guides for you.</div>
            </div>
          ) : error ? null : guides.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <div className="empty-title">No guides found</div>
              <div className="empty-description">
                {searchTopic 
                  ? `Try searching for different keywords or browse our popular topics above.`
                  : `No guides are currently available. Please check back later.`
                }
              </div>
            </div>
          ) : (
            guides.map((guide) => (
              <div key={guide.id} className="guide-card">
                <div className="guide-header">
                  <h3 className="guide-title">{guide.title}</h3>
                  <div className="guide-category">
                    <span>{getCategoryIcon(guide.category)}</span>
                    <span>{guide.category}</span>
                  </div>
                </div>
                
                <p className="guide-content">{guide.content}</p>
                
                <div className="guide-meta">
                  <div className="guide-info">
                    <div className="read-time">
                      <span>📖</span>
                      <span>{guide.readTime}</span>
                    </div>
                    <span
                      className="difficulty-badge"
                      style={{ 
                        backgroundColor: getDifficultyColor(guide.difficulty) + '20',
                        color: getDifficultyColor(guide.difficulty)
                      }}
                    >
                      {guide.difficulty}
                    </span>
                  </div>
                </div>
                
                {guide.tags && guide.tags.length > 0 && (
                  <div className="guide-tags">
                    {guide.tags.map((tag, index) => (
                      <span key={index} className="tag">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}