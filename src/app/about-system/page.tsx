/* src/app/design/about.module.css */

.container {
  min-height: 100vh;
  background-color: #6E6E6E; /* Industrial Grey */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  overflow: hidden;
}

.contentWrapper {
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 1s ease-out;
}

.label {
  font-family: 'Montserrat', sans-serif;
  color: #BCFD4C; /* Electric Lime */
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.6em;
  margin-bottom: 2rem;
}

.mainTitle {
  font-family: 'Cormorant Garamond', serif;
  color: #BCFD4C; 
  font-size: clamp(3rem, 7vw, 6rem);
  font-style: italic;
  font-weight: 300;
  text-align: center;
  line-height: 1;
  margin-bottom: 4rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  width: 100%;
  border-top: 1px solid rgba(188, 253, 76, 0.3); /* Low opacity Lime line */
  padding-top: 3rem;
}

.sectionTitle {
  font-family: 'Montserrat', sans-serif;
  color: #BCFD4C;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin-bottom: 1rem;
}

.description {
  font-family: 'Montserrat', sans-serif;
  color: #BCFD4C;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.8;
  opacity: 0.85;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
