import Homepage from "./components/Homepage";
import info_icon from "./asset/info.png"
import { useState } from "react";

function App() {
  const [showContent, setShowContent] = useState(false);
  return (
    <div className="app">
      <img className="info_icon" src={info_icon} alt="Search Icon" onClick={() => setShowContent(!showContent)} />
      {showContent ? <p className="company_info">
        <h1>Product Manager Accelerator</h1><br />
        The Product Manager Accelerator Program is designed to support PM professionals through every stage of their career. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.
<br /><br />
Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavours.
<br /><br />
Learn product management for free today on our YouTube channel <br />
<a href="https://www.youtube.com/c/drnancyli?sub_confirmation=1">https://www.youtube.com/c/drnancyli?sub_confirmation=1</a>
<br /><br />
Interested in PM Accelerator Pro? <br />
Step 1️⃣: Attend the Product Masterclass to learn more about the program details, price, different packages, and stay until the end to get FREE  AI Course. 
<br />
Learn how to create a killer product portfolio 2 two weeks that will help you land any PM job( traditional or AI) even if you were laid off or have zero PM experience
<br />
<a href="https://www.drnancyli.com/masterclass">https://www.drnancyli.com/masterclass</a>
<br /><br />
Step 2️⃣: Reserve your early bird ticket and submit an application to talk to our Head of Admission
<br /><br />
Step 3️⃣: Successful applicants join our PMA Pro community to receive customized coaching!
      </p>:<></>}
      <Homepage/>
      <h3 className="dev_by_info">Developed by: Ambar Shrivastava</h3>
    </div>
  );
}

export default App;
