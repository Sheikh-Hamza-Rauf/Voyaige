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
        { name: "Badshahi Mosque", description: "Historical Religious Sites", rating: 4.8, reviews: 1250, image: "https://mogulesque.com/wp-content/uploads/2023/01/badshahi-mosque-full-view-lahore-pakistan-4-1155x770.jpg" },
        { name: "Lahore Fort", description: "Historical Landmarks", rating: 4.7, reviews: 980, image: "https://architecturalanatomyblog.wordpress.com/wp-content/uploads/2017/06/feat3.jpg" },
        { name: "Shalimar Gardens", description: "Historical Gardens", rating: 4.5, reviews: 756, image: "https://media.licdn.com/dms/image/v2/D4D12AQEHWFNQNN30Yw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1698578653509?e=2147483647&v=beta&t=fV2pnjuYK99ntpj5eqizJrs0DpxRfy5om95oMGfb6ho" },
        { name: "Walled City", description: "Historic Sites", rating: 4.6, reviews: 890, image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Lahore_Walled_City.jpg" },
        { name: "Minar-e-Pakistan", description: "Monuments", rating: 4.7, reviews: 1100, image: "https://gypsytours.pk/wp-content/uploads/2023/05/Minar-e-Pakistan.jpg" },
        { name: "Food Street", description: "Cultural Sites", rating: 4.4, reviews: 670, image: "https://elmomento.pk/wp-content/uploads/2023/02/The-Lahore-Fort-Food-Street.jpg" }
    ],
    Karachi: [
        { name: "Clifton Beach", description: "Beaches", rating: 4.3, reviews: 920, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/fc/35/32/karachi-clifton-beach.jpg?w=700&h=400&s=1" },
        { name: "Mazar-e-Quaid", description: "Monuments", rating: 4.7, reviews: 1500, image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Jinnah_Mausoleum.JPG" },
        { name: "Port Grand", description: "Entertainment District", rating: 4.4, reviews: 780, image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Port_Grand_Karachi.JPG" },
        { name: "Mohatta Palace", description: "Historical Sites", rating: 4.5, reviews: 650, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/2b/9f/b4/jardines-del-palacio.jpg?w=1400&h=800&s=1" },
        { name: "National Museum", description: "Museums", rating: 4.3, reviews: 480, image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/PK_Karachi_asv2020-02_img32_National_Museum.jpg" },
        { name: "Do Darya", description: "Waterfront Dining", rating: 4.6, reviews: 890, image: "https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2019/11/image-5-1.jpg" }
    ],
    Murree: [
        { name: "Mall Road", description: "Shopping District", rating: 4.4, reviews: 780, image: "https://wpassets.graana.com/blog/wp-content/uploads/2023/12/Mall-Road-Murree.png.webp" },
        { name: "Kashmir Point", description: "Viewpoint", rating: 4.6, reviews: 560, image: "http://www.pakistantoursguide.pk/wp-content/uploads/2015/10/Holy-Trinity-Churchs-view-from-Kashmir-Point-1.jpg" },
        { name: "Pindi Point", description: "Scenic Point", rating: 4.5, reviews: 490, image: "https://www.pakistantoursguide.pk/wp-content/uploads/2015/10/Murree-Photos-General-Post-Office-Murree-after-heavy-snow-Murree-Pictures.jpg" },
        { name: "Chair Lifts", description: "Adventure Activities", rating: 4.3, reviews: 670, image: "https://elands.pk/wp-content/uploads/2024/10/Pindi-Point-Murree-1-edited.webp" },
        { name: "Governor House", description: "Historical Building", rating: 4.2, reviews: 320, image: "https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2019/08/cover-image-90.jpg" }
    ],
    Peshawar: [
        { name: "Bala Hisar Fort", description: "Historical Forts", rating: 4.7, reviews: 630, image: "https://res.cloudinary.com/www-travelpakistani-com/image/upload/v1660911384/Bala_Hisar_fort_-_Peshawar.jpg" },
        { name: "Qissa Khwani Bazaar", description: "Markets", rating: 4.5, reviews: 710, image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Oldpeshawarcity.jpg" },
        { name: "Peshawar Museum", description: "Museums", rating: 4.6, reviews: 430, image: "https://kparchaeology.gkp.pk/all_assets/images/1.jpg" },
        { name: "Islamia College", description: "Educational Sites", rating: 4.8, reviews: 520, image: "https://i.tribune.com.pk/media/images/1079245-IslamiaCollegePeshawarUniversityKPK-1459885675/1079245-IslamiaCollegePeshawarUniversityKPK-1459885675.jpg" },
        { name: "Khyber Pass", description: "Historical Sites", rating: 4.7, reviews: 560, image: "https://res.cloudinary.com/www-travelpakistani-com/image/upload/v1680261995/khyber_pass_KPK.jpg" },
        { name: "Chowk Yadgar", description: "Monuments", rating: 4.3, reviews: 350, image: "https://res.cloudinary.com/www-travelpakistani-com/image/upload/v1680177593/chowk_yadgar.jpg" }
    ],
    Skardu: [
        { name: "Shangrila Resort", description: "Resorts", rating: 4.9, reviews: 350, image: "https://porterpakistan.com/uploads/locations/Shangrila%20Lake.jpg" },
        { name: "Deosai National Park", description: "National Parks", rating: 5, reviews: 420, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/30/78/2c/rama-meadows.jpg?w=1600&h=-1&s=1" },
        { name: "Satpara Lake", description: "Lakes", rating: 4.7, reviews: 290, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/56/c6/1e/lake-formed-when-valley.jpg?w=1800&h=1000&s=1" },
        { name: "Skardu Fort", description: "Historical Forts", rating: 4.5, reviews: 250, image: "https://pyaraskardu.com/wp-content/uploads/2023/01/Kharpocho-Fort-Skardu-Pakistan.jpg" },
        { name: "Upper Kachura Lake", description: "Lakes", rating: 4.8, reviews: 320, image: "https://www.calamitytravels.com/wp-content/uploads/2022/04/IMG_8236-2-1024x578.jpg" },
        { name: "Katpana Desert", description: "Deserts", rating: 4.6, reviews: 180, image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Katpana_Desert.jpg" }
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
        { name: "Tomb of Shah Rukn-e-Alam", description: "Historical Religious Sites", rating: 4.9, reviews: 720, image: "https://www.saoarchitects.com/images-o/images/multan-tomb.jpg" },
        { name: "Multan Fort", description: "Historical Sites", rating: 4.6, reviews: 540, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/f1/31/68/old-fort-views.jpg?w=1100&h=-1&s=1" },
        { name: "Ghanta Ghar", description: "Clock Towers", rating: 4.4, reviews: 380, image: "https://multan.punjab.gov.pk/system/files/multan-ghanta-ghar_0.jpg" },
        { name: "Shrine of Bahauddin Zakariya", description: "Religious Sites", rating: 4.8, reviews: 610, image: "https://www.orientalarchitecture.com/gallery/pakistan/multan/bahauddin-zakariya/photos/bahauddin-zakariya_tomb01.jpg" },
        { name: "Hussain Agahi Bazaar", description: "Markets", rating: 4.5, reviews: 500, image: "https://pakvoices.pk/wp-content/uploads/2017/03/IMG_3052.jpg" },
        { name: "Tomb of Shah Shams Tabrez", description: "Historical Sites", rating: 4.7, reviews: 430, image: "https://www.orientalarchitecture.com/gallery/pakistan/multan/shah-shams-sabzwari/photos/shah-shams-sabzwari03.jpg" }
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
        <section className="top-attractions-page">
            <div className="section-header-page">
                <h2>Things to do in {cityName}</h2>
            </div>
            <div className="attractions-list-page">
                {attractions.map((attraction, index) => (
                    <div key={index} className="attraction-card-page">
                        <div className="attraction-image-page" style={{ backgroundImage: `url(${attraction.image})` }}>
                            
                            <div className="image-dots">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`dot ${i === 0 ? 'active' : ''}`}></span>
                                ))}
                            </div>
                        </div>
                        <div className="attraction-info-page">
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
