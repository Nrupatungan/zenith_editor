import Header from "@/components/Header";
import Navbar from "@/components/Navbar";


export default function Home() {
  
  return (
    <div>
      <Navbar/>
      <div className='container mx-auto px-7 bg-background'>
        <div className='py-8 min-h-screen'>
          <Header>Your Content</Header>
          
        </div>
      </div>
    </div>    
  );
}
