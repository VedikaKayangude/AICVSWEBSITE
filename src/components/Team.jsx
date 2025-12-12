import React, { useState, useEffect, useRef } from "react";
import BackgroundLayout from "./BackgroundLayout";

const MOCK_TEAM_DATA = [
  // AY 2025-2026 Team - Co-Heads
  {
    id: "6",
    title: "Sharvi Burse",
    text: "Co-Head Coordinator",
    details: "Optimizing potential, like fine-tuning hyperparameters.",
    imageUrl: "/images/Sharvi.jpg",
    supportTeam: [],
    year: "2025-2026",
    isCoHead: true
  },
  {
    id: "7",
    title: "Mira Vadjikar",
    text: "Co-Head Coordinator",
    details: "Brain full of algorithms, heart full of ideas.",
    imageUrl: "/images/Mira.jpg",
    supportTeam: [],
    year: "2025-2026",
    isCoHead: true
  },

  // AY 2025-2026 Team - Other Heads
  {
    id: "8",
    title: "Vedika Kayangude",
    text: "Website Development Team Lead",
    details: "Leading the web frontier with passion, precision and pixels.",
    imageUrl: "/images/Vedika.jpg",
    supportTeam: [
      "Jahnavi Singh",
      "Gautami Kulkarni",
      "Mahi Mahalle",
      "Arushi Dhawale",
      "Vaishnavi Karve"
    ],
    year: "2025-2026",
    isCoHead: false
  },
  {
    id: "9",
    title: "Shreeya Chavan",
    text: "Technical Team Lead",
    details: "Predicting the future isn't magic, It's artificial intelligence.",
    imageUrl: "/images/Shreeya.jpg",
    supportTeam: [
      "Khushi Varma",
      "Gauri Patil",
      "Asmita Wattamwar",
      "Sneha Maslekar",
      "Komal Sikchi",
      "Samruddhi Dargode"
    ],
    year: "2025-2026",
    isCoHead: false
  },
  {
    id: "11",
    title: "Bhakti Chaudhari",
    text: "Content and Design Team Lead",
    details: "Giving ideas their face.",
    imageUrl: "/images/Bhakti.jpg",
    supportTeam: [
      "Aditi Singnurkar",
      "Radha Kulkarni",
      "Arpita Wankhade",
      "Cheryl Varghese",
      "Isha Patil",
      "Riddhi Rathi",
      "Shreya Mate",
      "Palavi Hardikar"
    ],
    year: "2025-2026",
    isCoHead: false
  },
  {
    id: "10",
    title: "Aadya Singh",
    text: "PR and Sponsorship Team Lead",
    details: "Has a pitch ready for every pause in the conversation.",
    imageUrl: "/images/Aadya.jpg",
    supportTeam: [
      "Sharvari Ughade",
      "Ritisha Mangesh Satpute",
      "Akshara Rajesh Kshirsagar",
      "Aarya Pargaonkar",
      "Shweta Harshad Pawaskar",
      "Stuti Bhatt",
      "Shreya Babar",
      "Kavya Thacker",
      "Anushree Chatur",
      "Charvi Joshi",
      "Rajeshwari Rohidas Daund"
    ],
    year: "2025-2026",
    isCoHead: false
  },

  // AY 2024-2025 Team - Co-Heads
  {
    id: "3",
    title: "Ishita Lele",
    text: "Co-Head Coordinator",
    details: "Ishita handles high-level coordination and strategic alignment across all department heads, ensuring smooth communication and resource allocation for major initiatives.",
    imageUrl: "/images/ishita.png",
    supportTeam: [],
    year: "2024-2025",
    isCoHead: true
  },
  {
    id: "5",
    title: "Isha Bhagat",
    text: "Co-Head Coordinator",
    details: "Isha is responsible for overall operational management, tracking team metrics, managing budgets, and handling essential administrative oversight.",
    imageUrl: "/images/isha.png",
    supportTeam: [],
    year: "2024-2025",
    isCoHead: true
  },

  // AY 2024-2025 Team - Other Heads
  {
    id: "0",
    title: "Kruti Newalkar",
    text: "Website Development Team Lead",
    details: "Kruti leads the web development team, overseeing the architecture, UI/UX implementation, and deployment of all user-facing applications.",
    imageUrl: "/images/kruti.png",
    supportTeam: ["Sameeksha Tantak", "Vedika Kayangude", "Sanika Shidore", "Shraddha Sabde", "Akshata Ramgiri"],
    year: "2024-2025",
    isCoHead: false
  },
  {
    id: "1",
    title: "Varada Gokhale",
    text: "Technical Team Lead",
    details: "Varada manages the overall technical direction, ensuring implementation of engineering best practices, code quality, and integration across all projects.",
    imageUrl: "/images/varada.png",
    supportTeam: ["Aastha Ingle", "Nandini Pathak", "Mira Vadjikar", "Saniya Karambelkar", "Siddhi Faizpurkar"],
    year: "2024-2025",
    isCoHead: false
  },
  {
    id: "2",
    title: "Yashita Killedar",
    text: "Content and Design Team Lead",
    details: "Yashita coordinates all creative assets, ensuring content strategy aligns with brand guidelines and manages the visual design of all promotional materials and platforms.",
    imageUrl: "/images/yashita.png",
    supportTeam: ["Nidhi Patil", "Anjali Patel", "Tanvi Shirwadkar", "Anvi Shelar", "Anoushka Wadyalkar", "Nainsee Khade"],
    year: "2024-2025",
    isCoHead: false
  },
  {
    id: "4",
    title: "Siya Shah",
    text: "PR and Sponsorship Team Lead",
    details: "Siya drives external relations, manages media outreach, and secures strategic partnerships and sponsorships to support the team's operational needs.",
    imageUrl: "/images/siya.png",
    supportTeam: ["Kavya Thacker", "Ananya Dani", "Akshata Lolge", "Aadya Singh", "Shreeya Chavan", "Advika Khorgade", "Arya Patekhede", "Sukhada Bhagwat", "Shreya Babar", "Garima Kardbhajane"],
    year: "2024-2025",
    isCoHead: false
  },
];



const MemberModal = ({ member, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const lastMemberRef = useRef(member); 

  useEffect(() => {
    if (member) {
      lastMemberRef.current = member;
      setIsOpen(true);
    } else {
      const timer = setTimeout(() => setIsOpen(false), 300);
      return () => clearTimeout(timer);
    }
  }, [member]);

  const displayMember = member || lastMemberRef.current;

  if (!displayMember && !isOpen) return null;

  const initials = displayMember?.title ? displayMember.title.split(' ').map(n => n[0]).join('') : 'P';
  
  const backdropClasses = `fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
    member ? "opacity-100" : "opacity-0 pointer-events-none"
  }`;

  const modalClasses = `
    relative bg-zinc-900 border border-purple-700/50 rounded-xl shadow-2xl max-w-4xl w-full mx-4
    transition-all duration-300 ease-out 
    ${member ? "scale-100 opacity-100" : "scale-90 opacity-0"}
  `;

  return (
    <div className={backdropClasses}>
      <div 
        className="absolute inset-0 bg-black opacity-70" 
        onClick={onClose} 
        aria-label="Close details"
      />

      <div className={modalClasses}>
        <div className="flex justify-end p-2">
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-zinc-800"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row p-4 md:p-6 pt-0">
          
          {/* Image Container with Layered Text Effect */}
          <div 
            className="w-full md:w-2/5 flex-shrink-0 mb-6 md:mb-0 md:mr-8 relative group overflow-hidden rounded-xl shadow-inner shadow-black/30"
            style={{
                backgroundColor: '#1c1920', 
            }}
          >
  
            <img
              src={displayMember?.imageUrl || `https://placehold.co/400x400/18181b/a855f7?text=${initials}`}
              width={400}
              height={400}
              alt={displayMember?.title || "Member Image"}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.05] shadow-xl"
              style={{
                transform: 'translateY(1rem) scale(1.05)', 
                zIndex: 10, 
              }}
            />
          </div>

          {/* Details Container */}
          <div className="w-full md:w-3/5 text-left pt-4 md:pt-0">
            <h3 className="text-3xl md:text-5xl font-extrabold mb-1 text-white tracking-tight">
              {displayMember?.title || "Name"}
            </h3>
            
            {/* Role/Position */}
            <p className="text-lg md:text-xl font-medium text-purple-400 mb-4 md:mb-6">
              {displayMember?.text || "Role Not Specified"}
            </p>
            
            {/* Details/Bio Section - Show for all members */}
            <div className="mb-4 md:mb-6">
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                {displayMember?.details || "Details about this team member will be added soon."}
              </p>
            </div>
            
            {/* Supporting Team Section - Only show for non-CoHeads */}
            {!displayMember?.isCoHead && (
              <div className="mt-4 md:mt-6">
                <h4 className="text-lg md:text-xl font-medium text-zinc-400 mb-3 md:mb-4">Supporting Team:</h4>
                
                {displayMember?.supportTeam && displayMember.supportTeam.length > 0 ? (
                  <div className="flex flex-wrap gap-2 text-zinc-300 max-h-48 md:max-h-60 overflow-y-auto p-1 -m-1">
                    {displayMember.supportTeam.map((name, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-zinc-800 text-xs md:text-sm px-2 md:px-3 py-1 rounded-full border border-zinc-700/50 hover:bg-zinc-700 transition-colors duration-200"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-400 italic text-xs md:text-sm p-2 bg-zinc-800/30 rounded-lg">
                    This member serves in a core leadership/coordination role.
                  </p>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};


/**
 * Team Grid for Co-Heads (centered layout)
 */
const CoHeadsGrid = ({ team, onCardClick }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8">
        {team.map((member) => (
          <div
            key={member.id}
            className="relative overflow-hidden rounded-xl shadow-2xl shadow-black/50 bg-zinc-900 border border-zinc-700 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-purple-500/30 w-full sm:w-64 md:w-72 lg:w-80 flex-shrink-0"
            onMouseEnter={() => setHoveredId(member.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onCardClick(member)} 
          >
            {/* Image Container */}
            <div 
              className={`aspect-square w-full transition-all duration-300 ease-out 
                ${hoveredId === member.id ? "scale-[1.05] sm:scale-[1.10] opacity-90" : "scale-100 opacity-100"}`
              }
            >
              {member.imageUrl && (
                <img
                  src={member.imageUrl}
                  width={400}
                  height={400}
                  alt={member.title}
                  className="w-full h-full object-cover rounded-t-xl"
                  onError={(e) => {
                    e.target.onerror = null; 
                    const initials = member.title ? member.title.split(' ').map(n => n[0]).join('') : 'P';
                    e.target.src = `https://placehold.co/400x400/18181b/a855f7?text=${initials}`;
                  }}
                />
              )}
            </div>

            <div className="p-3 sm:p-4 text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-0.5 text-white transition-colors duration-300">
                {member.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-2 sm:mb-3">
                {member.text}
              </p>
            </div>
            
            <div 
              className={`absolute bottom-0 left-0 right-0 h-1 transition-transform duration-300 ease-in-out bg-purple-500 
                ${hoveredId === member.id ? "scale-x-100" : "scale-x-0"}`
              }
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Team Grid for Department Heads (4 in one line)
 */
const DepartmentHeadsGrid = ({ team, onCardClick }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="relative overflow-hidden rounded-xl shadow-2xl shadow-black/50 bg-zinc-900 border border-zinc-700 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-purple-500/30"
            onMouseEnter={() => setHoveredId(member.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onCardClick(member)} 
          >
            {/* Image Container */}
            <div 
              className={`aspect-square w-full transition-all duration-300 ease-out 
                ${hoveredId === member.id ? "scale-[1.05] sm:scale-[1.10] opacity-90" : "scale-100 opacity-100"}`
              }
            >
              {member.imageUrl && (
                <img
                  src={member.imageUrl}
                  width={400}
                  height={400}
                  alt={member.title}
                  className="w-full h-full object-cover rounded-t-xl"
                  onError={(e) => {
                    e.target.onerror = null; 
                    const initials = member.title ? member.title.split(' ').map(n => n[0]).join('') : 'P';
                    e.target.src = `https://placehold.co/400x400/18181b/a855f7?text=${initials}`;
                  }}
                />
              )}
            </div>

            <div className="p-3 sm:p-4 text-center">
              <h3 className="text-base sm:text-xl font-semibold mb-0.5 text-white transition-colors duration-300">
                {member.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-2 sm:mb-3">
                {member.text}
              </p>

              {member.supportTeam && member.supportTeam.length > 0 && (
                <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-purple-900/40 text-purple-300 text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2c0-.656-.126-1.283-.356-1.857M9 20H4v-2a3 3 0 015-2.483M9 20v-2a3 3 0 00-5.356-1.857m10.712 0c.322.18.643.376.956.577m-1.993-1.848a3 3 0 011.312-.647c.422-.192.836-.36 1.258-.51l1.795-.69a1 1 0 001.034-.139 1 1 0 00.139-1.034c-.191-.422-.358-.836-.51-1.258l-.69-1.795a1 1 0 00-.139-1.034 1 1 0 00-1.034-.139l-1.795.69c-.422.192-.836.36-1.258.51-1.312.493-2.651.983-3.956 1.487" />
                  </svg>
                  <span className="text-xs">{member.supportTeam.length} Members</span>
                </div>
              )}
            </div>
            
            <div 
              className={`absolute bottom-0 left-0 right-0 h-1 transition-transform duration-300 ease-in-out bg-purple-500 
                ${hoveredId === member.id ? "scale-x-100" : "scale-x-0"}`
              }
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};


/**
 * Main Team component.
 */
const Team = ({ name = "The Core Team", team = MOCK_TEAM_DATA }) => {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleCardClick = (member) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  // Filter teams by year and type
  const team2025_2026_coHeads = team.filter(member => member.year === "2025-2026" && member.isCoHead);
  const team2025_2026_otherHeads = team.filter(member => member.year === "2025-2026" && !member.isCoHead);
  const team2024_2025_coHeads = team.filter(member => member.year === "2024-2025" && member.isCoHead);
  const team2024_2025_otherHeads = team.filter(member => member.year === "2024-2025" && !member.isCoHead);

  if (!team || team.length === 0) {
    return (
      <div className="py-12 sm:py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-400">{name}</h2>
        <p className="mt-4 text-zinc-500 text-sm sm:text-base">No team members listed for this academic year.</p>
      </div>
    );
  }

  const mainContentClass = selectedMember 
    ? "py-12 sm:py-16 px-4 font-sans antialiased blur-sm pointer-events-none transition-filter duration-300" 
    : "py-12 sm:py-16 px-4 font-sans antialiased transition-filter duration-300";
return (
 
  <div className="min-h-screen text-white bg-transparent">
    
<BackgroundLayout/>
    <div className={mainContentClass}>
      
      {/* AY 2025-2026 Section */}
      <div className="container mx-auto max-w-7xl mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
          AICVS Team AY 2025-2026
        </h2>
        <p className="text-center text-zinc-400 max-w-3xl mx-auto text-sm sm:text-lg px-4">
          Meet the dedicated professionals driving our mission forward.
        </p>
      </div>

      {/* Co-Heads Section */}
      {team2025_2026_coHeads.length > 0 && (
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-purple-300">
            Co-Head Coordinators
          </h3>
          <CoHeadsGrid team={team2025_2026_coHeads} onCardClick={handleCardClick} />
        </div>
      )}

      {/* Other Heads Section */}
      {team2025_2026_otherHeads.length > 0 && (
        <div className="mt-12 sm:mt-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-purple-300">
            Team Leads
          </h3>
          <DepartmentHeadsGrid team={team2025_2026_otherHeads} onCardClick={handleCardClick} />
        </div>
      )}

      {/* AY 2024-2025 Section */}
      <div className="container mx-auto max-w-7xl mb-8 sm:mb-12 mt-16 sm:mt-24">
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
          AICVS Team AY 2024-2025
        </h2>
        <p className="text-center text-zinc-400 max-w-3xl mx-auto text-sm sm:text-lg px-4">
          Recognizing the exceptional leaders who guided our team in the previous academic year.
        </p>
      </div>

      {/* Co-Heads Section */}
      {team2024_2025_coHeads.length > 0 && (
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-purple-300">
            Co-Head Coordinators
          </h3>
          <CoHeadsGrid team={team2024_2025_coHeads} onCardClick={handleCardClick} />
        </div>
      )}

      {/* Other Heads Section */}
      {team2024_2025_otherHeads.length > 0 && (
        <div className="mt-12 sm:mt-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-purple-300">
            Team Leads
          </h3>
          <DepartmentHeadsGrid team={team2024_2025_otherHeads} onCardClick={handleCardClick} />
        </div>
      )}
    </div>

    <MemberModal
      member={selectedMember}
      onClose={handleCloseModal}
    />
  </div>
);
}
export default Team;
