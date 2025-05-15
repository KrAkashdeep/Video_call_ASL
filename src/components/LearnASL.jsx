import React, { useState } from "react";

// ASL data for the application
const aslData = {
  alphabet: [
    { letter: 'A', image: '/alphabets/A_test.jpg', description: 'Make a fist with your hand. Your thumb should rest against the side of your finger.' },
    { letter: 'B', image: '/alphabets/B_test.jpg', description: 'Hold your hand up with your palm facing forward. Keep your fingers straight and together, with your thumb tucked against your palm.' },
    { letter: 'C', image: '/alphabets/C_test.jpg', description: 'Curve your hand in a C shape, with your palm facing to the side.' },
    { letter: 'D', image: '/alphabets/D_test.jpg', description: 'Make a circle with your thumb and index finger, while keeping other fingers straight up.' },
    { letter: 'E', image: '/alphabets/E_test.jpg', description: 'Curl your fingers in toward your palm. Your thumb should rest against your fingertips.' },
    { letter: 'F', image: '/alphabets/F_test.jpg', description: 'Touch your thumb and index finger together in a circle. Extend your other three fingers.' },
    { letter: 'G', image: '/alphabets/G_test.jpg', description: 'Point your index finger to the side while making a fist. Your thumb extends alongside your fingers.' },
    { letter: 'H', image: '/alphabets/H_test.jpg', description: 'Extend your index and middle fingers together, side by side.' },
    { letter: 'I', image: '/alphabets/I_test.jpg', description: 'Make a fist and extend only your pinky finger.' },
    { letter: 'J', image: '/alphabets/J_test.jpg', description: 'Extend your pinky finger and trace the letter J in the air.' },
    { letter: 'K', image: '/alphabets/K_test.jpg', description: 'Form a "K" shape with your fingers - index finger and middle finger extended upward from the knuckle, with thumb extended to the side.' },
    { letter: 'L', image: '/alphabets/L_test.jpg', description: 'Form an "L" shape with your thumb and index finger, with other fingers curled into your palm.' },
    { letter: 'M', image: '/alphabets/M_test.jpg', description: 'Place your thumb between your ring and pinky fingers, with all fingers folded down.' },
    { letter: 'N', image: '/alphabets/N_test.jpg', description: 'Place your thumb between your middle and ring fingers, with all fingers folded down.' },
    { letter: 'O', image: '/alphabets/O_test.jpg', description: 'Form a circle with all your fingertips and thumb touching.' },
    { letter: 'P', image: '/alphabets/P_test.jpg', description: 'Point your middle finger down with your index finger and thumb extended, forming a "P" shape.' },
    { letter: 'Q', image: '/alphabets/Q_test.jpg', description: 'Form a "G" and move your hand downward.' },
    { letter: 'R', image: '/alphabets/R_test.jpg', description: 'Cross your middle finger over your index finger while extending both, with other fingers curled.' },
    { letter: 'S', image: '/alphabets/S_test.jpg', description: 'Make a fist with your thumb wrapped over your fingers.' },
    { letter: 'T', image: '/alphabets/T_test.jpg', description: 'Make a fist with your thumb between your index and middle fingers.' },
    { letter: 'U', image: '/alphabets/U_test.jpg', description: 'Extend your index and middle fingers together, side by side, forming a "U" shape.' },
    { letter: 'V', image: '/alphabets/V_test.jpg', description: 'Extend your index and middle fingers in a "V" shape, with other fingers curled.' },
    { letter: 'W', image: '/alphabets/W_test.jpg', description: 'Extend your index, middle, and ring fingers spread apart, forming a "W" shape.' },
    { letter: 'X', image: '/alphabets/X_test.jpg', description: 'Make a fist with your index finger bent in a hook shape.' },
    { letter: 'Y', image: '/alphabets/Y_test.jpg', description: 'Extend your thumb and pinky finger while curling other fingers into your palm.' },
    { letter: 'Z', image: '/alphabets/Z_test.jpg', description: 'Trace the letter Z in the air with your index finger.' },
  ],
  numbers: [
    { number: '0', image: '/numbers/Sign 0.jpeg', description: 'Form a circle with your thumb and fingers, resembling the number 0.' },
    { number: '1', image: '/numbers/Sign 1.jpeg', description: 'Point your index finger upward while making a fist with your other fingers.' },
    { number: '2', image: '/numbers/Sign 2.jpeg', description: 'Extend your index and middle fingers while keeping other fingers curled into a fist.' },
    { number: '3', image: '/numbers/Sign 3.jpeg', description: 'Extend your thumb, index, and middle fingers while keeping other fingers curled.' },
    { number: '4', image: '/numbers/Sign 4.jpeg', description: 'Extend four fingers with your thumb tucked across your palm.' },
    { number: '5', image: '/numbers/Sign 5.jpeg', description: 'Extend all five fingers with your palm facing forward.' },
    { number: '6', image: '/numbers/Sign 6.jpeg', description: 'Extend your thumb and pinky finger while keeping your three middle fingers extended but slightly bent.' },
    { number: '7', image: '/numbers/Sign 7.jpeg', description: 'Extend your thumb, index, and middle fingers, with your ring finger and pinky touching your palm.' },
    { number: '8', image: '/numbers/Sign 8.jpeg', description: 'Extend your thumb, index, middle, and ring fingers, with your pinky touching your palm.' },
    { number: '9', image: '/numbers/Sign 9.jpeg', description: 'Make a closed "9" shape by bending your index finger to touch the tip of your thumb, while keeping other fingers straight.' },
    // { number: '10', image: '/numbers/10_test.jpg', description: 'Shake your hand with all fingers extended, palm facing outward, or use both hands to show "1" and "0".' },
  ],
  phrases: [
    { word: 'Hello', image: '/words/hello.jpg', description: 'Touch your fingers to your forehead near your temple, then move your hand away in an arc.' },
    { word: 'Thank you', image: '/words/thanku.png', description: 'Touch your chin or lips with the fingertips of one flat hand, then move the hand forward and down.' },
    { word: 'Please', image: '/words/please.jpeg', description: 'Rub your flat hand in a circular motion over your chest.' },
    { word: 'Sorry', image: '/words/sorry.png', description: 'Make a fist and rub it in a circular motion over your chest.' },
    { word: 'Love', image: '/words/love.jpg', description: 'Cross your arms over your chest, like hugging yourself.' },
  ],
  lessons: [
    { title: 'Basic Greetings', image: '/api/placeholder/200/200', description: 'Learn how to greet people in ASL with proper etiquette and expressions.' },
    { title: 'Everyday Objects', image: '/api/placeholder/200/200', description: 'Learn signs for common objects you encounter in daily life.' },
    { title: 'Family Members', image: '/api/placeholder/200/200', description: 'Learn how to sign about your family and relationships.' },
    { title: 'Emotions', image: '/api/placeholder/200/200', description: 'Express feelings and emotions through ASL signs.' },
  ],
  resources: [

        { 
          title: 'ASL Alphabet A-Z', 
          image: '/lessons/alphabet.jpg', 
          description: 'Learn the complete ASL alphabet from A to Z with clear demonstrations.',
          videoUrl: 'https://www.youtube.com/embed/7suKo9kCTus?si=jf8DIScjknRcB72H'
        },
        { 
          title: 'ASL Numbers 1-20', 
          image: '/lessons/numbers.jpg', 
          description: 'Learn how to sign numbers 1-20 in American Sign Language.',
          videoUrl: 'https://www.youtube.com/embed/SP6maLr2DDI?si=2VI4fplH0lAIO6gs'
        },
        { 
          title: 'ASL Colors', 
          image: '/lessons/colors.jpg', 
          description: 'Learn how to sign different colors in American Sign Language.',
          videoUrl: 'https://www.youtube.com/embed/Dsh0YWwfn-M?si=KG7FdH1V_-Ws6g1R'
        },
        { 
          title: 'ASL Family Signs', 
          image: '/lessons/family.jpg', 
          description: 'Learn signs for family members like mother, father, sister, brother, etc.',
          videoUrl: 'https://www.youtube.com/embed/RdCnFf8BslA?si=Ub6ARX1sWYnFGuFX'
        },
        { 
          title: 'ASL Emotions & Feelings', 
          image: '/lessons/emotions.jpg', 
          description: 'Learn how to express emotions and feelings in American Sign Language.',
          videoUrl: 'https://www.youtube.com/embed/L-EuYYqMsuU?si=sy45_tlhcIdl9KxF'
        },
        { 
          title: 'ASL Common Phrases', 
          image: '/lessons/phrases.jpg', 
          description: 'Learn everyday phrases and expressions in American Sign Language.',
          videoUrl: 'https://www.youtube.com/embed/jCUaMdXsI7w?si=T6ZtFeYaPYkLk8BU'
        },
        { 
          title: 'ASL Animals', 
          image: '/lessons/animals.jpg', 
          description: 'Learn how to sign different animals in American Sign Language.',
          videoUrl: 'https://www.youtube.com/embed/3V8kP6scQpY?si=fNQrv6Ece8H6zl3x'
        },
        { 
          title: 'ASL Food Signs', 
          image: '/lessons/food.jpg', 
          description: 'Learn signs for different foods and drinks in American Sign Language.',
          videoUrl: 'https://www.youtube.com/embed/ghQr2hzdx8k?si=jXEbrAbCY7RqoEGq'
        },
        { 
          title: 'ASL Weather Signs', 
          image: '/lessons/weather.jpg', 
          description: 'Learn how to sign weather conditions in American Sign Language.',
          videoUrl: 'https://www.youtube.com/embed/xfhvTHsceTU?si=88inPxCu1IOMwKKp'
        },
        { 
          title: 'ASL Conversation Practice', 
          image: '/lessons/conversation.jpg', 
          description: 'Practice basic conversations in American Sign Language.',
          videoUrl: 'https://www.youtube.com/embed/lGrssQASztg?si=ZTS0DX49talQiK3b'
        },
    
  ]
};

function LearnASL({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('alphabet');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Add this new state variable for video modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Filter items based on search term
  const filteredItems = searchTerm 
    ? aslData[selectedCategory].filter(item => {
        const searchableText = item.letter || item.number || item.word || item.title || '';
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
      case 'alphabet': return 'ASL Alphabet';
      case 'numbers': return 'ASL Numbers';
      case 'phrases': return 'Common ASL Phrases';
      case 'lessons': return 'Interactive ASL Lessons';
      case 'resources': return 'ASL Resources';
      default: return 'ASL Learning';
    }
  };

  // Add this new function to handle video resource clicks
  const handleResourceClick = (resource) => {
    if (selectedCategory === 'resources' || selectedCategory === 'lessons') {
      setSelectedVideo(resource.videoUrl);
      setShowVideoModal(true);
    } else {
      handleItemClick(resource);
    }
  };

  // Add this function to close the video modal
  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-green-600 text-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Learn ASL</h1>
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Back to Dashboard
          </button>
        </div>
        <p className="mt-2">Learn American Sign Language at your own pace</p>
      </header>
      
      {/* Navigation */}
      <div className="flex justify-center mb-6">
        <nav className="bg-white p-2 rounded-full shadow-md">
          <ul className="flex flex-wrap space-x-2">
            <li>
              <button 
                onClick={() => setSelectedCategory('alphabet')}
                className={`px-4 py-2 rounded-full ${selectedCategory === 'alphabet' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
              >
                Alphabet
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSelectedCategory('numbers')}
                className={`px-4 py-2 rounded-full ${selectedCategory === 'numbers' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
              >
                Numbers
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSelectedCategory('phrases')}
                className={`px-4 py-2 rounded-full ${selectedCategory === 'phrases' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Common Phrases
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSelectedCategory('lessons')}
                className={`px-4 py-2 rounded-full ${selectedCategory === 'lessons' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
              >
                Interactive Lessons
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSelectedCategory('resources')}
                className={`px-4 py-2 rounded-full ${selectedCategory === 'resources' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
              >
                Resources
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
            const itemKey = item.letter || item.number || item.word || item.title;
            return (
              <div 
                key={index}
                className="bg-white rounded-lg p-4 shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
                onClick={() => (selectedCategory === 'resources' || selectedCategory === 'lessons') ? handleResourceClick(item) : handleItemClick(item)}
              >
                <div className="flex justify-center mb-3">
                  <img 
                    src={item.image} 
                    alt={`ASL sign for ${itemKey}`} 
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{itemKey}</h3>
                <p className="text-sm text-gray-600 text-center">
                  {(selectedCategory === 'resources' || selectedCategory === 'lessons') ? 'Click to watch video' : 'Click to learn'}
                </p>
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
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">
                {selectedItem.letter || selectedItem.number || selectedItem.word || selectedItem.title}
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
                alt={`ASL sign for ${selectedItem.letter || selectedItem.number || selectedItem.word || selectedItem.title}`} 
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
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Video Modal for resources */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">
                {selectedCategory === 'lessons' ? 'ASL Lesson Video' : 'ASL Resource Video'}
              </h3>
              <button 
                onClick={handleCloseVideoModal}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe 
                src={selectedVideo}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-96"
              ></iframe>
            </div>
            
            <div className="text-center">
              <button 
                onClick={handleCloseVideoModal}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
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

export default LearnASL;