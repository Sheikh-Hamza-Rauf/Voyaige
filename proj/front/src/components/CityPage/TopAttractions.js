import React from 'react';
import './TopAttractions.css';

const cityAttractions = {
    Islamabad: [
        { name: "Faisal Mosque", description: "Religious Sites", rating: 4.5, reviews: 812, image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Faisal_Masjid_From_Damn_e_koh.jpg" },
        { name: "Margalla Hills", description: "Geologic Formations, Mountains", rating: 5, reviews: 323, image: "https://media-cdn.tripadvisor.com/media/photo-s/16/51/09/79/margalla-hills-is-the.jpg" },
        { name: "Daman-e-Koh", description: "Lookouts", rating: 4.5, reviews: 287, image: "https://guidetopakistan.pk/wp-content/uploads/2021/10/Daman-e-koh1.jpg" },
        { name: "Pakistan Monument Museum", description: "Specialty Museums", rating: 4.5, reviews: 234, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Blue_Hour_at_Pakistan_Monument.jpg/1200px-Blue_Hour_at_Pakistan_Monument.jpg" },
        { name: "Saidpur Village", description: "Neighborhoods", rating: 4, reviews: 230, image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Saidpur_Village%2C_Islamabad_Capital_Territory%2C_P1090833_tonemapped.jpg" },
        { name: "Lake View Park", description: "Parks", rating: 4, reviews: 94, image: "https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2020/07/Lake-View-Park-Islamabad-B-10-07-1024x640.jpg" }
    ],
    Lahore: [
        { name: "Badshahi Mosque", description: "Historical Religious Sites", rating: 4.8, reviews: 1250, image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Badshahi_Mosque_Lahore.jpg" },
        { name: "Lahore Fort", description: "Historical Landmarks", rating: 4.7, reviews: 980, image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Lahore_Fort_View_1.JPG" },
        { name: "Shalimar Gardens", description: "Historical Gardens", rating: 4.5, reviews: 756, image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Shalimar_Gardens_Lahore_12.jpg" },
        { name: "Walled City", description: "Historic Sites", rating: 4.6, reviews: 890, image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Lahore_Walled_City.jpg" },
        { name: "Minar-e-Pakistan", description: "Monuments", rating: 4.7, reviews: 1100, image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Minar_e_Pakistan_1.jpg" },
        { name: "Food Street", description: "Cultural Sites", rating: 4.4, reviews: 670, image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Food_Street_Lahore.jpg" }
    ],
    Karachi: [
        { name: "Clifton Beach", description: "Beaches", rating: 4.3, reviews: 920, image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Clifton_Beach.jpg" },
        { name: "Mazar-e-Quaid", description: "Monuments", rating: 4.7, reviews: 1500, image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Mazar-e-Quaid%2C_Karachi.jpg" },
        { name: "Port Grand", description: "Entertainment District", rating: 4.4, reviews: 780, image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Port_Grand_Karachi.jpg" },
        { name: "Mohatta Palace", description: "Historical Sites", rating: 4.5, reviews: 650, image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Mohatta_Palace_2020.jpg" },
        { name: "National Museum", description: "Museums", rating: 4.3, reviews: 480, image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/National_Museum_Karachi.jpg" },
        { name: "Do Darya", description: "Waterfront Dining", rating: 4.6, reviews: 890, image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Do_Darya_Karachi.jpg" }
    ],
    Murree: [
        { name: "Mall Road", description: "Shopping District", rating: 4.4, reviews: 780, image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Mall_Road_Murree.jpg" },
        { name: "Kashmir Point", description: "Viewpoint", rating: 4.6, reviews: 560, image: "https://upload.wikimedia.org/wikipedia/commons/d/db/Kashmir_Point_Murree.jpg" },
        { name: "Pindi Point", description: "Scenic Point", rating: 4.5, reviews: 490, image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Pindi_Point_Murree.jpg" },
        { name: "Chair Lifts", description: "Adventure Activities", rating: 4.3, reviews: 670, image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chair_Lift_Murree.jpg" },
        { name: "Patriata", description: "Hill Station", rating: 4.4, reviews: 450, image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Patriata.jpg" },
        { name: "Governor House", description: "Historical Building", rating: 4.2, reviews: 320, image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Governor_House_Murree.jpg" }
    ],
    Peshawar: [
        { name: "Bala Hisar Fort", description: "Historical Forts", rating: 4.7, reviews: 630, image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Bala_Hisar_Fort_Peshawar.jpg" },
        { name: "Qissa Khwani Bazaar", description: "Markets", rating: 4.5, reviews: 710, image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Qissa_Khwani_Bazaar_Peshawar.jpg" },
        { name: "Peshawar Museum", description: "Museums", rating: 4.6, reviews: 430, image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Peshawar_Museum.jpg" },
        { name: "Islamia College", description: "Educational Sites", rating: 4.8, reviews: 520, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Islamia_College_Peshawar.jpg" },
        { name: "Khyber Pass", description: "Historical Sites", rating: 4.7, reviews: 560, image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Khyber_Pass.jpg" },
        { name: "Chowk Yadgar", description: "Monuments", rating: 4.3, reviews: 350, image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Chowk_Yadgar_Peshawar.jpg" }
    ],
    Skardu: [
        { name: "Shangrila Resort", description: "Resorts", rating: 4.9, reviews: 350, image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Shangrila_Resort_Skardu.jpg" },
        { name: "Deosai National Park", description: "National Parks", rating: 5, reviews: 420, image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Deosai_National_Park.jpg" },
        { name: "Satpara Lake", description: "Lakes", rating: 4.7, reviews: 290, image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Satpara_Lake.jpg" },
        { name: "Skardu Fort", description: "Historical Forts", rating: 4.5, reviews: 250, image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Skardu_Fort.jpg" },
        { name: "Upper Kachura Lake", description: "Lakes", rating: 4.8, reviews: 320, image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Upper_Kachura_Lake_Skardu.jpg" },
        { name: "Katpana Desert", description: "Deserts", rating: 4.6, reviews: 180, image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Katpana_Desert_Skardu.jpg" }
    ],
    Hunza: [
        { name: "Altit Fort", description: "Historical Sites", rating: 4.9, reviews: 410, image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Altit_Fort_Hunza.jpg" },
        { name: "Rakaposhi View Point", description: "Mountains", rating: 4.8, reviews: 290, image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Rakaposhi_View_Hunza.jpg" },
        { name: "Attabad Lake", description: "Lakes", rating: 5, reviews: 600, image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Attabad_Lake_Hunza.jpg" },
        { name: "Eagle's Nest", description: "Scenic Viewpoints", rating: 4.7, reviews: 330, image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Eagle_Nest_Hunza.jpg" },
        { name: "Passu Cones", description: "Mountains", rating: 4.9, reviews: 450, image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Passu_Cones_Hunza.jpg" },
        { name: "Baltit Fort", description: "Historical Sites", rating: 4.8, reviews: 460, image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Baltit_Fort_Hunza.jpg" }
    ],
    Quetta: [
        { name: "Hanna Lake", description: "Lakes", rating: 4.7, reviews: 540, image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Hanna_Lake_Quetta.jpg" },
        { name: "Ziarat Residency", description: "Historical Sites", rating: 4.5, reviews: 350, image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Ziarat_Residency_Quetta.jpg" },
        { name: "Chiltan Hills", description: "Mountains", rating: 4.6, reviews: 200, image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chiltan_Hills_Quetta.jpg" },
        { name: "Quaid-e-Azam Residency", description: "Monuments", rating: 4.8, reviews: 400, image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Quaid-e-Azam_Residency_Ziarat.jpg" },
        { name: "Pishin Valley", description: "Valleys", rating: 4.6, reviews: 240, image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Pishin_Valley_Quetta.jpg" },
        { name: "Hazarganji Chiltan National Park", description: "National Parks", rating: 4.5, reviews: 180, image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Hazarganji_Chiltan_National_Park.jpg" }
    ],
    Multan: [
        { name: "Tomb of Shah Rukn-e-Alam", description: "Historical Religious Sites", rating: 4.9, reviews: 720, image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Tomb_of_Shah_Rukn-e-Alam_Multan.jpg" },
        { name: "Multan Fort", description: "Historical Sites", rating: 4.6, reviews: 540, image: "https://upload.wikimedia.org/wikipedia/commons/5/50/Multan_Fort.jpg" },
        { name: "Ghanta Ghar", description: "Clock Towers", rating: 4.4, reviews: 380, image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Ghanta_Ghar_Multan.jpg" },
        { name: "Shrine of Bahauddin Zakariya", description: "Religious Sites", rating: 4.8, reviews: 610, image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Shrine_of_Bahauddin_Zakariya_Multan.jpg" },
        { name: "Hussain Agahi Bazaar", description: "Markets", rating: 4.5, reviews: 500, image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Hussain_Agahi_Bazaar_Multan.jpg" },
        { name: "Tomb of Shah Shams Tabrez", description: "Historical Sites", rating: 4.7, reviews: 430, image: "https://upload.wikimedia.org/wikipedia/commons/5/54/Tomb_of_Shah_Shams_Tabrez_Multan.jpg" }
    ],
    Faisalabad: [
        { name: "Clock Tower", description: "Historical Landmarks", rating: 4.6, reviews: 920, image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Clock_Tower_Faisalabad.jpg" },
        { name: "Lyallpur Museum", description: "Museums", rating: 4.5, reviews: 310, image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Lyallpur_Museum_Faisalabad.jpg" },
        { name: "Jinnah Garden", description: "Parks", rating: 4.4, reviews: 480, image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Jinnah_Garden_Faisalabad.jpg" },
        { name: "Qaisery Gate", description: "Historical Gates", rating: 4.2, reviews: 320, image: "https://upload.wikimedia.org/wikipedia/commons/3/39/Qaisery_Gate_Faisalabad.jpg" },
        { name: "Gatwala Wildlife Park", description: "Wildlife Parks", rating: 4.3, reviews: 290, image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Gatwala_Wildlife_Park_Faisalabad.jpg" },
        { name: "D Ground", description: "Shopping District", rating: 4.4, reviews: 670, image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/D_Ground_Faisalabad.jpg" }
    ]
};

const TopAttractions = ({ cityName = "Islamabad" }) => {
    const attractions = cityAttractions[cityName] || cityAttractions["Islamabad"];

    return (
        <section className="top-attractions">
            <div className="section-header">
                <h2>Things to do in {cityName}</h2>
            </div>
            <div className="attractions-list">
                {attractions.map((attraction, index) => (
                    <div key={index} className="attraction-card">
                        <div className="attraction-image" style={{ backgroundImage: `url(${attraction.image})` }}>
                            <button className="favorite-button"><i className="fa fa-heart" /></button>
                            <div className="image-dots">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`dot ${i === 0 ? 'active' : ''}`}></span>
                                ))}
                            </div>
                        </div>
                        <div className="attraction-info">
                            <h3>{attraction.name}</h3>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < Math.floor(attraction.rating) ? 'filled' : ''}`}>★</span>
                                ))}
                                <span className="review-count">{attraction.reviews}</span>
                            </div>
                            <p>{attraction.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopAttractions;
