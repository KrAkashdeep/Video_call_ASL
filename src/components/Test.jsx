import { useState } from 'react';

// ASL data for the application
const aslData = {
  alphabets: [
    { letter: 'A', image: '/api/placeholder/200/200', description: 'Make a fist with your hand. Your thumb should rest against the side of your finger.' },
    { letter: 'B', image: '/api/placeholder/200/200', description: 'Hold your hand up with your palm facing forward. Keep your fingers straight and together, with your thumb tucked against your palm.' },
    { letter: 'C', image: '/api/placeholder/200/200', description: 'Curve your hand in a C shape, with your palm facing to the side.' },
    { letter: 'D', image: '/api/placeholder/200/200', description: 'Make a circle with your thumb and index finger, while keeping other fingers straight up.' },
    { letter: 'E', image: '/api/placeholder/200/200', description: 'Curl your fingers in toward your palm. Your thumb should rest against your fingertips.' },
    { letter: 'F', image: '/api/placeholder/200/200', description: 'Touch your thumb and index finger together in a circle. Extend your other three fingers.' },
    // More letters can be added
  ],
  numbers: [
    { number: '1', image: '/api/placeholder/200/200', description: 'Point your index finger upward while making a fist with your other fingers.' },
    { number: '2', image: '/api/placeholder/200/200', description: 'Extend your index and middle fingers while keeping other fingers curled into a fist.' },
    { number: '3', image: '/api/placeholder/200/200', description: 'Extend your thumb, index, and middle fingers while keeping other fingers curled.' },
    { number: '4', image: '/api/placeholder/200/200', description: 'Extend four fingers with your thumb tucked across your palm.' },
    { number: '5', image: '/api/placeholder/200/200', description: 'Extend all five fingers with your palm facing forward.' },
    // More numbers can be added
  ],
  commonWords: [
    { word: 'Hello', image: '/api/placeholder/200/200', description: 'Touch your fingers to your forehead near your temple, then move your hand away in an arc.' },
    { word: 'Thank you', image: '/api/placeholder/200/200', description: 'Touch your chin or lips with the fingertips of one flat hand, then move the hand forward and down.' },
    { word: 'Please', image: '/api/placeholder/200/200', description: 'Rub your flat hand in a circular motion over your chest.' },
    { word: 'Sorry', image: '/api/placeholder/200/200', description: 'Make a fist and rub it in a circular motion over your chest.' },
    { word: 'Love', image: '/api/placeholder/200/200', description: 'Cross your arms over your chest, like hugging yourself.' },
    // More words can be added
  ]
};

export default function Test() {
  const [selectedCategory, setSelectedCategory] = useState('alphabets');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter items based on search term
  const filteredItems = searchTerm 
    ? aslData[selectedCategory].filter(item => {
        const searchableText = item.letter || item.number || item.word || '';
        return searchableText.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : aslData[selectedCategory];

  // Handle item click for modal display
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Get the title for the selected category
  const getCategoryTitle = () => {
    switch(selectedCategory) {
      case 'alphabets': return 'ASL Alphabets';
      case 'numbers': return 'ASL Numbers';
      case 'commonWords': return 'Common ASL Words';
      default: return 'ASL Learning';
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold text-center">ASL Learning Platform</h1>
        <p className="text-center mt-2">Learn American Sign Language at your own pace</p>
      </header>
      
      {/* Navigation */}
      <div className="flex justify-center mb-6">
        <nav className="bg-white p-2 rounded-full shadow-md">
          <ul className="flex space-x-2">
            <li>
              <button 
                onClick={() => setSelectedCategory('alphabets')}
                className={`px-4 py-2 rounded-full ${selectedCategory === 'alphabets' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Alphabets
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSelectedCategory('numbers')}
                className={`px-4 py-2 rounded-full ${selectedCategory === 'numbers' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Numbers
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSelectedCategory('commonWords')}
                className={`px-4 py-2 rounded-full ${selectedCategory === 'commonWords' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Common Words
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder={`Search ${selectedCategory}...`}
          className="w-full p-3 rounded-lg border shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">{getCategoryTitle()}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => {
            const itemKey = item.letter || item.number || item.word;
            return (
              <div 
                key={index}
                className="bg-white rounded-lg p-4 shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex justify-center mb-3">
                  <img 
                    src={item.image} 
                    alt={`ASL sign for ${itemKey}`} 
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{itemKey}</h3>
                <p className="text-sm text-gray-600 text-center">Click to learn</p>
              </div>
            );
          })}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center p-6">
            <p className="text-lg">No items found for your search. Try a different term.</p>
          </div>
        )}
      </div>
      
      {/* Modal for detailed view */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">
                {selectedItem.letter || selectedItem.number || selectedItem.word}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            
            <div className="flex justify-center mb-4">
              <img 
                src={selectedItem.image} 
                alt={`ASL sign for ${selectedItem.letter || selectedItem.number || selectedItem.word}`} 
                className="w-48 h-48 object-cover rounded-md"
              />
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">How to sign:</h4>
              <p>{selectedItem.description}</p>
            </div>
            
            <div className="text-center">
              <button 
                onClick={handleCloseModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="mt-12 text-center text-gray-600">
        <p>© {new Date().getFullYear()} ASL Learning Platform</p>
        <p className="text-sm mt-1">Learn American Sign Language with ease</p>
      </footer>
    </div>
  );
}