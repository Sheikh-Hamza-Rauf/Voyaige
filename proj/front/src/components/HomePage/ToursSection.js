import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ToursSection.css';
import Navbar from '../NavBar/Navbar';


const ToursSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const trips = [
    {
      id: 1,
      title: '4 DAYS TRIP TO Northern Beauty - Skardu & Hunza',
      description: 'Explore the breathtaking valleys of Skardu,  and Hunza.',
      image: 'https://i.dawn.com/primary/2015/04/552534a77b507.jpg?r=961640394',
      cities: [
        { name: 'Skardu', days: 2 },
        { name: 'Hunza', days: 2 },
      ],
    },
    {
      id: 2,
      title: 'Discover the Cultural Heritage of Multan & Quetta for 4 Days',
      description: 'Discover the historical richness of Multan and Quetta.',
      image: 'https://www.porterpakistan.com/uploads/2020/01/Mariabad.jpg',
      cities: [
        { name: 'Multan', days: 2 },
        { name: 'Quetta', days: 2 },
      ],
    },
    {
      id: 3,
      title: 'Historical & Urban Adventure for 5 Days  - Lahore, Islamabad ',
      description: 'Experience the rich culture and modern vibes of Lahore, Islamabad.',
      image: 'https://i0.wp.com/www.pakistangulfeconomist.com/wp-content/uploads/2017/10/Islamabad.jpg?fit=1045%2C600&ssl=1',
      cities: [
        { name: 'Lahore', days: 3 },
        { name: 'Islamabad', days: 2 },
      ],
    },
    {
      id: 4,
      title: 'Majestic Northern Escapade for 3 Days  - Skardu & Kashmir',
      description: 'Discover the stunning beauty of Skardu and the valleys of Kashmir.',
      image: 'https://cms-in.musafir.com/uploads/1_1_1_8a4b22b915.webp',
      cities: [
        { name: 'Multan', days: 2 },
        { name: 'Peshawar', days: 1 },
      ],
    },
    {
      id: 5,
      title: 'Discover the Cultural Heritage of Peshawar in 2 Days',
      description: 'Discover the culture of Pakistan in Peshawar ',
      image: 'https://skyticket.com/guide/wp-content/uploads/2017/12/iStock-538601654-e1540535918101.jpg',
      cities: [
        { name: 'Peshawar', days: 2 }
      ],
    },
   
  ];

  const data = {
    Skardu: {
      hotels: [{name: "Avari Xpress Skardu", address:'572, Sumbul Town, Olding, 16100 Skardu, Pakistan',rating: 4.8, reviews: 500, price: 'Rs 17,000', image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/574985766.jpg?k=83642812acce3381463ec0a821ea54213f6e1becb2ec27123c6578ca31d0d8de&o="},
               
      ],
      restaurants: [
        { name: "The Grind Cafe and Eatery, Skardu", rating: 4.7, address:'Main Hameedgarh Road, Opposite PTDC Motel, Skardu, Skardu 16100 Pakistan',reviews: 850, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/49/6d/d5/cafe-interior.jpg?w=1400&h=-1&s=1" },
        { name: "Food Street Api Xhoq Skardu", rating: 4.6,address:'Sadpara road sumbul town Skardu, Skardu 46100 Pakistan' ,reviews: 600, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/21/8d/9d/food-street-skardu.jpg?w=1000&h=-1&s=1" },
        { name: "Dewanekhas Restaurant Skardu", rating: 4.8, reviews: 500, address:'Kazmi Bazar Skardu Near polo Grond, Skardu 16100 Pakistan', image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/50/4c/86/trip-type-family-couple.jpg?w=900&h=-1&s=1" },
        { name: "Shahi Dewan", rating: 3.5, address:'Maqpon Plaza, Hussaini Chowk, Gamba Skardu, Skardu, Baltistan, Gilgit-Baltistan',reviews: 850, image: "https://lh3.googleusercontent.com/p/AF1QipNmUCZC8bNVjXXnrU_UGXDrhL1vlIAD3SheZKVs=s1360-w1360-h1020" },
        { name: "Rafsal restaurant", rating: 3.5, address:'JS bank, Rafsal first floor, main road, Skardu, 16100',reviews: 850, image: "https://lh5.googleusercontent.com/p/AF1QipOleOGvXgmoSaQwMFnarmQZ615la_Sj8vpKjOcg=w650-h437-n-k-no" },
        { name: "Chainomy", rating: 3.7, address:'Haji Gaam Chowk, Skardu, Gilgit-Baltistan',reviews: 850, image: "https://lh5.googleusercontent.com/p/AF1QipN-1luLVwyzjzLqkEMxUWwEjdu5sAECemq4GHmw=w650-h437-n-k-no" }
       
      ],
      attractions: [
        { name: "Kharphocho Fort", description: "Historical Fort.", rating: 4.9, reviews: 350, image: "https://pak-adventure.com/wp-content/uploads/2017/11/kharpoch-1024x568.jpg" },
        { name: "Upper Kachura Lake", description: "National Parks", rating: 5, reviews: 420, image: "https://pyaraskardu.com/wp-content/uploads/2022/12/1280px-Upper_kachura_lake_skardu_baltistan.jpg" },
        { name: "Satpara Lake", description: "Lakes", rating: 4.7, reviews: 290, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/56/c6/1e/lake-formed-when-valley.jpg?w=1800&h=1000&s=1" },
        { name: "Manthal Buddha Rock", description: "Historical landmark", rating: 4.5, reviews: 250, image: "https://lh3.googleusercontent.com/p/AF1QipMWrI8nutcFKBENtAgCkIJi604QTyAimbBorBCm=s294-w294-h220-k-no" },
        { name: "Katpana Desert", description: "Desert", rating: 4.5, reviews: 250, image: "https://lh3.googleusercontent.com/p/AF1QipO3gazfvJqxeQ4j5KQiYXQoZeC-raoaHtWJBIFW=s294-w294-h220-k-no" },
      ],
    },
    Chitral: {
      hotels: [{ name: 'Ayun Fort Inn', address:'Kalash Valley Road Ayun Town, Chitral 17200 Pakistan',rating: 4.8, reviews: 500, price: 'Rs 15,000', image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/ea/19/1c/ayun-fort-inn.jpg?w=1400&h=-1&s=1" }],
      restaurants: [
        { name: "Fokker Friendship Restaurant", rating: 4.7, address:'Singoor, Chitral 17200 Pakistan',reviews: 850, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/08/88/e4/fokker-friendship-restaurant.jpg?w=1400&h=800&s=1" },
        { name: "Terichmir View Restaurant", rating: 4.6,address:'Booni Road , Kuragh , Mastuj, Chitral 17020 Pakistan' ,reviews: 600, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/26/48/d4/outside-view-of-the-restaurant.jpg?w=1400&h=800&s=1" },
        { name: " Zowalo Restaurant", rating: 4.3, reviews: 500, address:'Denin, Chitrāl, Chitral, Khyber Pakhtunkhwa', image: "https://lh5.googleusercontent.com/p/AF1QipMey2hSk5DbujvTIBzaMQnmVyJuMHkgo50sSu2u=w650-h437-n-k-no" },
      ],
      attractions: [
        { name: "Bumburet", description: "Ravine", rating: 4.9, reviews: 350, image: "https://lh3.googleusercontent.com/p/AF1QipNOfnK_ThLP8Pb0F_fwsRuWBC-AwvLy_bSxb10q=s294-w294-h220-k-no" },
        { name: "Chitral Fort", description: "Historical Fort", rating: 5, reviews: 420, image: "https://lh3.googleusercontent.com/p/AF1QipOsmNnXy7RkqTEB7_2YOe9afKFm-xWWwwdLT-1b=s294-w294-h220-k-no" },
        { name: "Rambur ", description: "Ravine", rating: 4.7, reviews: 290, image: "https://lh3.googleusercontent.com/p/AF1QipNifqeP00gDgiAuu0GD_4fpf4tbnvVW-jXoFTB7=s220-w165-h220-k-no" },
        { name: "Shahi Masjid Chitral", description: "Masjid", rating: 4.5, reviews: 250, image: "https://lh3.googleusercontent.com/p/AF1QipNhq2rC9H39aIQkvmUfsgvrAbBmz_htCrm7P45U=s294-w294-h220-k-no" },
        { name: "Chitral Gol National Park", description: "National Park ", rating: 4.5, reviews: 250, image: "https://lh3.googleusercontent.com/p/AF1QipOcJaE7kxqsYY6q7ELx8DVNZTnbIME7SD546Hlc=s294-w294-h220-k-no" },
      ],
    },
    Hunza: {
      hotels: [ 
        { name: "Hunza Serena Inn", rating: 4.9, reviews: 600, price: 'Rs 1500', image: "path_to_serena_inn_image.jpg" },
      ],
      restaurants: [
        { name: "Pizza Pamir", rating: 4.7, reviews: 900,address:'Baltit Fort Chowk, Hunza 15700 Pakistan', image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/a7/d6/3b/a-picture-taken-by-one.jpg?w=1400&h=-1&s=1" },
        { name: "Hidden Paradise Hunza", rating: 4.6, reviews: 750, address:'Bazaar Road Gilgit Baltistan, Hunza 15700 Pakistan', image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/87/0d/4a/hidden-paradise-hunza.jpg?w=1400&h=800&s=1" },
        { name: "Gingerfort Cafe", rating: 4.5, reviews: 800, address:'Gingerfort Cafe, Hunza Pakistan', image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/95/0d/d6/interior-decor-at-gingerfort.jpg?w=1400&h=800&s=1" },
        { name: "Osho Maraka", rating: 4.4, reviews: 500, address: "Serena Hotel, Hunza 15600 Pakistan", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/31/1f/26/winter-view-from-osho.jpg?w=1400&h=800&s=1" },
        { name: "Cafe Culture Hunza", rating: 4.3, reviews: 600,address:'Near Altit Fort, Hunza 15701 Pakistan', image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/c8/f9/b3/main-entrance-of-cafe.jpg?w=1400&h=-1&s=1" },
        { name: "Hidden Paradise Hunza", rating: 4.5, reviews: 400, address:'Altit Fort Road Village Altit, Hunza 15710 Pakistan', image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/09/b2/9c/1.jpg?w=1400&h=-1&s=1" }
      ],
      attractions: [
        { name: "Altit Fort", description: "Historical Sites", rating: 4.9, reviews: 410, image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTGtwBVkhV8I2Xt8fSynuJ-qt6Ia8XTKxMb6IeNflizLbLho2wtcTsB11EWoU01_K_b0iq6pb1O5Qjx3Yl7z15b7Iy8BiG8OP_Z69PBcQ" },
        { name: "Hussaini Hanging Bridge", description: "Tourist Attraction", rating: 4.8, reviews: 290, image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTD-gsq_47JXVdLRwbA4TsV6BXf22ypC9Y3x3B6vGao3zMu6YWQTgKfq840Jmsgg5K_8EhLCfQ39-v1Zp5abPVo0TD2BRfdKD9npPn62g" },
        { name: "Attabad Lake", description: "Lakes", rating: 5, reviews: 600, image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcT_CnmsUBtiRaq22_gcXxj8-kPNaoKgHfWjh0IAC9kDrN1fDXMco1UOU5G4Sg6QfCg7lLjIvu2UDzIAUVPGvFGXmDwUEgpJJz9qLElAvA" },
        { name: "Passu Glacier", description: "Glacier", rating: 4.7, reviews: 330, image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQdHik0ahJ1-9gDCP27-QbLtE4SgSLVGdTMDV1hJn8E9z8ZEw4DnbSTTY0c3mRuQukEa4OJgss_GTNebGvbiJ2h9OgxBrgc8HA5CslopA" },
        { name: "Borith Lake", description: "Lake", rating: 4.9, reviews: 450, image: "https://lh5.googleusercontent.com/p/AF1QipOy9oU59KSC1OMOY03xTwDicfwmSH3Ax3kzJfe8=w540-h312-n-k-no" },
        { name: "Shim Shal", description: "Village", rating: 4.8, reviews: 460, image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT0p9roMIWiQkLiZAEMzEmPqxPANsGZUIXly-IMl2e8cDuWYmysin0nJhPcvfY1DyMHTIkIOaPB59fF9R4Ju2g1LogWebc7GYsboyIyXQ" }
      ],
    },
    Multan: {
      hotels: [ 
        { name: "Ramada Multan", rating: 4.6, reviews: 700, price: 'RS 1440', image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/297286146.jpg?k=cde21033a620e90d57a0b6969d2cef6e3d3baa18d66bc06c855acc8c3f2a9177&o=" },
        ],
      restaurants: [
        { name: "Multan Tandoori", rating: 4.7, reviews: 850, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/b1/52/bf/multan-interior.jpg?w=1800&h=1000&s=1" },
        { name: "Ramada Multan", rating: 4.6, reviews: 980, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/aa/f9/ac/located-in-the-heart.jpg?w=1400&h=800&s=1" },
        { name: "Shahjahan Grill", rating: 4.5, reviews: 750, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/4d/11/94/exterior-facade.jpg?w=1800&h=1000&s=1" },
        { name: "London Courtyard", rating: 4.6, reviews: 700, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/c2/0f/e3/photo1jpg.jpg?w=1800&h=1000&s=1" },
        { name: "Chinatown & Jade Café", rating: 4.5, reviews: 650, price: "$$$", image: "https://lh3.googleusercontent.com/p/AF1QipMZP88czi_TwdcLSGnL9hz3dE_Kvx41bM1u4Y7T=s1360-w1360-h1020" },
        { name: "Al Kaif Multan", rating: 4.3, reviews: 500, price: "$$", image: "https://lh5.googleusercontent.com/p/AF1QipPe7Cju6Mnjeo1I4pbkFjrqEG-JXBxbZ7h5rf-9=w650-h437-n-k-no" }
      ],
      attractions: [
        { name: "Altit Fort", description: "Historical Sites", rating: 4.9, reviews: 410, image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Altit_Fort_Hunza.jpg" },
        { name: "Rakaposhi View Point", description: "Mountains", rating: 4.8, reviews: 290, image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Rakaposhi_View_Hunza.jpg" },
        { name: "Attabad Lake", description: "Lakes", rating: 5, reviews: 600, image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Attabad_Lake_Hunza.jpg" },
        { name: "Eagle's Nest", description: "Scenic Viewpoints", rating: 4.7, reviews: 330, image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Eagle_Nest_Hunza.jpg" },
        { name: "Passu Cones", description: "Mountains", rating: 4.9, reviews: 450, image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Passu_Cones_Hunza.jpg" },
        { name: "Baltit Fort", description: "Historical Sites", rating: 4.8, reviews: 460, image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Baltit_Fort_Hunza.jpg" }
      ],
    },
    Quetta: {
      hotels: [
        { name: "Quetta Serena Hotel", rating: 4.7, reviews: 800, price: 'Rs 1190', image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/9f/c2/6f/quetta-serena-hotel.jpg?w=1400&h=-1&s=1" },
        ],
      restaurants: [
        { name: "Saigon", rating: 4.5, reviews: 850, price: "$$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/33/7d/df/saigon.jpg?w=1400&h=-1&s=1" },
        { name: "New Quetta Restaurant & Cafeteria", rating: 4.6, reviews: 600, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/80/ce/19/new-quetta-restaurant.jpg?w=1400&h=800&s=1" },
        { name: "Quetta Grill", rating: 4.4, reviews: 550, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/b1/8f/0a/quetta-grill.jpg?w=1800&h=1000&s=1" },
        { name: "Quetta Club Limited", rating: 4.5, reviews: 500, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/20/d9/15/1f/quetta-club-limited-since.jpg?w=1400&h=-1&s=1" },
        { name: "Saigon Cafe & Restaurant", rating: 4.3, reviews: 400, price: "$$", image: "https://lh5.googleusercontent.com/p/AF1QipOs8Cn364KhjTm1rdIEnG9vOzRra4gZfaYl5Q4X=w650-h437-n-k-no" },
        { name: "Al Fajar Restauran", rating: 4.2, reviews: 350, price: "$$", image: "https://lh3.googleusercontent.com/p/AF1QipOxRmkVcWSEKLmV2l082ZN4ptLWze0EW1a4znp5=s1360-w1360-h1020" }
      ],
      attractions: [
        { name: "Hanna Lake", description: "Lakes", rating: 4.7, reviews: 540, image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Hanna_Lake_Quetta.jpg" },
        { name: "Ziarat Residency", description: "Historical Sites", rating: 4.5, reviews: 350, image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Ziarat_Residency_Quetta.jpg" },
        { name: "Chiltan Hills", description: "Mountains", rating: 4.6, reviews: 200, image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chiltan_Hills_Quetta.jpg" },
        { name: "Quaid-e-Azam Residency", description: "Monuments", rating: 4.8, reviews: 400, image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Quaid-e-Azam_Residency_Ziarat.jpg" },
        { name: "Pishin Valley", description: "Valleys", rating: 4.6, reviews: 240, image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Pishin_Valley_Quetta.jpg" },
        { name: "Hazarganji Chiltan National Park", description: "National Parks", rating: 4.5, reviews: 180, image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Hazarganji_Chiltan_National_Park.jpg" }
      ],
    },
  };
   // Handle navigating to the detailed view for each trip
   const handleViewDetails = (trip) => {
    setLoading(true);
    setLoading(true);
    try {
      const cityData = trip.cities.map((city) => ({
        cityName: city.name,
        days: city.days,
        hotels: data[city.name]?.hotels || [],
        restaurants: data[city.name]?.restaurants || [],
        attractions: data[city.name]?.attractions || []
      }));


      navigate('/trip-details', {
        state: {
          cityData,
          tripTitle: trip.title,
          tripImage: trip.image
        },
      });
    } catch (error) {
      console.error('Error handling trip details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = () => {
    const enrichedTrips = trips.map(trip => ({
      ...trip,
      cityData: trip.cities.map(city => ({
        cityName: city.name,
        days: city.days,
        hotels: data[city.name]?.hotels || [],
        restaurants: data[city.name]?.restaurants || [],
        attractions: data[city.name]?.attractions || []
      }))
    }));

    navigate('/all-trips', {
      state: { trips: enrichedTrips }
    });
  };

  return (
    <section className="preplanned_trips">
      <Navbar />
      <div className="container">
        <h2>Pre-Planned Trips</h2>
        <p>Choose from our exciting pre-planned trips for an unforgettable adventure.</p>
        {/* "View More" button to navigate to the next page */}
        <p className="view-more" onClick={handleViewAll}>View More</p>
        <div className="trips_list">
          {trips.slice(0, 4).map((trip) => (
            <div className="trip_card" key={trip.id}>
              <img src={trip.image} alt={trip.title} />
              <div className="trip_info">
                <h3>{trip.title}</h3>
                <p>{trip.description}</p>
                <button onClick={() => handleViewDetails(trip)} disabled={loading}>
                  {loading ? 'Loading...' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default ToursSection;
