                                                                                                                                                                           
  A futuristic, interactive portfolio website designed to showcase technical skill through an immersive, cyberpunk-inspired user experience. This project goes beyond a
  static collection of links by simulating a fully functional, command-line interface (CLI) system experience.                               

  
  https://img.shields.io/badge/Technologies-HTML%20CSS%20JavaScript-blue.svg
                                                                                                                                                                            
  **Features **                                                                                                                                                              
                                                                                                                                                                            
  - Immersive UX: Built around a pseudo-terminal/OS aesthetic, giving visitors a sense of interacting with a sophisticated system.                                          
  - Interactive Elements: Features a simulated command-line interface (CLI) experience where users can run commands to navigate different sections of the portfolio.
  - Thematic Design: Utilizes a dark, neon, and gritty cyberpunk visual theme.                                                                                              
  - Dynamic Content: All sections (About, Skills, Projects, Contact) are loaded and displayed dynamically via JavaScript, mimicking system calls.                           
  - Comprehensive Showcase: Designed to allow developers to showcase mastery in front-end development, scripting, and UX design principles.                                 
                                                                                                                                                                            
 ** Getting Started  **                                                                                                                                                      
                                                                                                                                                                            
  These instructions will get you a copy of the project up and running on your local machine for development and testing.                                                   
                  
  Prerequisites                                                                                                                                                             
                  
  You need the following installed on your machine:                                                                                                                         
  - Node.js (Recommended for any future backend integrations)
  - A modern web browser (Chrome, Firefox, etc.)                                                                                                                            
                                                
  Installation                                                                                                                                                              
                                                                                                                                                                            
  1. Clone the repository:                                                                                                                                                  
  git clone [repository-url]                                                                                                                                                
  cd [project-directory]                                                                                                                                                    
  2. Open in Browser:                                                                                                                                                       
  Since this is a pure client-side project, simply open the index.html file in your web browser to view the site.                                                           
                                                                                                                                                                            
  **Project Structure  **                                                                                                                                                    
                                                                                                                                                                            
  The project is organized into clean, separated concerns:                                                                                                                  
                  
  .                                                                                                                                                                         
  ├── index.html        # The main entry point of the application.                                                                                                          
  ├── style.css         # Core styles defining the cyberpunk look and feel.                                                                                                 
  ├── script.js         # Handles all the core interactivity, CLI logic, and content loading.                                                                               
  ├── assets/                                                                                                                                                               
  │   ├── images/       # Any necessary background graphics or icons.                                                                                                       
  │   └── fonts/        # Custom fonts used for the terminal aesthetic.                                                                                                     
  └── README.md         # This file.                                                                                                                                        
                                                                                                                                                                            
 ** Development & Customization Guide  **                                                                                                                                                                                                                                                                                                              
  The power of this project lies in its separation of structure, style, and behavior.                                                                                       
                  
  1. Styling (style.css)                                                                                                                                                    
                  
  - This file controls the visual appearance, color palette (neon greens/blues on black), and font stack.                                                                   
  - To change the theme: Modify color variables (e.g., --primary-color) at the top of the file.
                                                                                                                                                                            
  2. Interactivity (script.js)                                                                                                                                              
                                                                                                                                                                            
  - This is the "brain" of the portfolio. It manages the state of the simulated terminal.                                                                                   
  - To add new sections/pages:
    a. Define the new section's content data structure within the JavaScript.                                                                                               
    b. Create a corresponding command (e.g., show projects).                                                                                                                
    c. Update the event listeners to handle the new command.                                                                                                                
                                                                                                                                                                            
  3. Content Updates                                                                                                                                                        
                                                                                                                                                                            
  - Skills: Update the data array in script.js that defines the skills and their proficiency levels.                                                                        
  - Projects: Add new project objects to the dedicated project array. Include links, descriptions, and technologies used.
  - Contact: Update the contact information object within script.js.                                                                                                        
                                                                                                                                                                            
**  Future Enhancements (Roadmap)   **                                                                                                                                       
                                                                                                                                                                            
  1. Backend Integration: Integrate with a simple backend (e.g., Node/Express) to power a functional contact form that actually sends emails.                               
  2. Animation Polish: Implement more advanced CSS animations (e.g., character-by-character text typing effects for all content).
  3. Theming: Add a light/dark mode toggle, although the core theme is dark.                                                                                                
  4. API Integration: Fetch dynamic data (like live stock tickers or GitHub stats) to show real-time developer activity.                                                    
                                                                                                                                                                            
**   Contributing  **                                                                                                                                                         
                                                                                                                                                                            
  We welcome contributions! Whether it's fixing a bug, improving the code structure, or designing a new command, your help is greatly appreciated.                          
                  
  Please follow these steps:                                                                                                                                                
  1. Fork the repository.
  2. Create your feature branch (git checkout -b feature/AmazingFeature).                                                                                                   
  3. Commit your changes (git commit -m 'feat: Added amazing feature').  
  4. Push to the branch (git push origin feature/AmazingFeature).                                                                                                           
  5. Open a Pull Request.                                                                                                                                                   
     
