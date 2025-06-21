import Header from './pages/Header';
import Gallery from './pages/Gallery';
import Footer from './pages/Footer';
import Home from './pages/Home';
import './styles.css';


function App() {
  return (
    <div className="app">
      <Header />
      <Home />
      <Gallery/>
      <Footer />
    </div>
  );
}

export default App;