import { useState } from 'react';
import { FaRobot, FaSearch, FaServer, FaDatabase, FaCloudDownloadAlt } from 'react-icons/fa';
import { BiCodeAlt } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdViewList } from 'react-icons/md';

export default function PuppeteerExplanation() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: "Meklēšanas Pieprasījums",
      icon: <FaSearch className="text-blue-600 w-8 h-8" />,
      description: "Kad meklējat auto detaļu, jūsu pieprasījums tiek nosūtīts uz mūsu serveri."
    },
    {
      title: "Pārlūka Automatizācija",
      icon: <FaRobot className="text-green-600 w-8 h-8" />,
      description: "Mūsu Puppeteer boti palaiž neredzamus pārlūkus, kas vienlaicīgi apmeklē vairākas auto detaļu vietnes."
    },
    {
      title: "Datu Iegūšana",
      icon: <BiCodeAlt className="text-purple-600 w-8 h-8" />,
      description: "Mūsu skrāpētāji iegūst informāciju par produktiem, cenām un pieejamību no katras vietnes."
    },
    {
      title: "Datu Apstrāde",
      icon: <FaServer className="text-orange-600 w-8 h-8" />,
      description: "Rezultāti tiek apkopoti, filtrēti un organizēti standartizētā formātā."
    },
    {
      title: "Rezultātu Piegāde",
      icon: <MdViewList className="text-red-600 w-8 h-8" />,
      description: "Visi atbilstošie produkti no vairākām vietnēm tiek parādīti jums vienā kopīgā skatā."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg md:rounded-2xl shadow-md py-8 px-4 my-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Kā Darbojas ChikChing.lv</h2>
      <p className="text-base md:text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Mūsu modernā tīmekļa skrāpēšanas tehnoloģija meklē vairākās auto detaļu vietnēs vienlaicīgi, 
        ietaupot jūsu laiku un palīdzot atrast labākos piedāvājumus
      </p>
      
      {/* Diagram section */}
      <div className="mb-8 relative">
        <div className="hidden md:flex items-center justify-center mb-8">
          <div className="w-full flex justify-between items-center relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">
                <div 
                  className={`rounded-full p-4 transition-all duration-300 ${
                    index === activeStep ? 'bg-blue-100 scale-110' : 'bg-gray-100'
                  }`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {step.icon}
                </div>
                <p className="text-sm font-medium mt-2 text-center">{step.title}</p>
              </div>
            ))}
            
            {/* Connecting lines */}
            <div className="absolute h-1 bg-gray-300 top-7 left-16 right-16 -z-0">
              <div 
                className="absolute h-1 bg-blue-500 top-0 left-0 transition-all duration-500"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Mobile stepping diagram */}
        <div className="md:hidden">
          <div className="flex justify-between mb-4">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`w-6 h-6 rounded-full ${index <= activeStep ? 'bg-blue-500' : 'bg-gray-300'}`}
                onClick={() => setActiveStep(index)}
              ></div>
            ))}
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-center mb-4">
              {steps[activeStep].icon}
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">{steps[activeStep].title}</h3>
            <p className="text-sm text-center">{steps[activeStep].description}</p>
          </div>
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className={`px-3 py-1 rounded ${activeStep === 0 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
            >
              Iepriekšējais
            </button>
            <button 
              onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={activeStep === steps.length - 1}
              className={`px-3 py-1 rounded ${activeStep === steps.length - 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
            >
              Nākamais
            </button>
          </div>
        </div>
        
        {/* Description for current step */}
        <div className="hidden md:block mt-6">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <p className="text-lg text-gray-800">{steps[activeStep].description}</p>
          </div>
        </div>
      </div>
      
      {/* Websites section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold text-center mb-4">Vietnes, Kurās Meklējam Jums</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {['Autodoc', 'Inter Cars', 'RD24', 'Trodo', 'TOP'].map((site, index) => (
            <div key={index} className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
              {site}
            </div>
          ))}
        </div>
      </div>
      
      {/* Animation of search process */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="bg-gray-800 rounded-lg p-6 text-white overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="min-w-10">
              <FaServer className="w-10 h-10 text-blue-400" />
            </div>
            <div className="font-mono text-sm">
              <div className="mb-1 text-green-400">ChikChing Serveris</div>
              <div className="mb-2">$ Tiek palaistas pārlūka instances...</div>
              <div className="mb-1 flex items-center">
                <AiOutlineLoading3Quarters className={`w-4 h-4 mr-2 ${activeStep >= 1 ? 'animate-spin text-yellow-400' : 'text-gray-600'}`} />
                <span className={activeStep >= 1 ? 'text-white' : 'text-gray-600'}>Skrāpējam Autodoc.lv</span>
              </div>
              <div className="mb-1 flex items-center">
                <AiOutlineLoading3Quarters className={`w-4 h-4 mr-2 ${activeStep >= 2 ? 'animate-spin text-yellow-400' : 'text-gray-600'}`} />
                <span className={activeStep >= 2 ? 'text-white' : 'text-gray-600'}>Skrāpējam ICars.lv</span>
              </div>
              <div className="mb-1 flex items-center">
                <AiOutlineLoading3Quarters className={`w-4 h-4 mr-2 ${activeStep >= 2 ? 'animate-spin text-yellow-400' : 'text-gray-600'}`} />
                <span className={activeStep >= 2 ? 'text-white' : 'text-gray-600'}>Skrāpējam Trodo.lv</span>
              </div>
              <div className="mb-2 flex items-center">
                <FaCloudDownloadAlt className={`w-4 h-4 mr-2 ${activeStep >= 3 ? 'text-green-400' : 'text-gray-600'}`} />
                <span className={activeStep >= 3 ? 'text-white' : 'text-gray-600'}>Apstrādājam rezultātus</span>
              </div>
              <div className="flex items-center">
                <FaDatabase className={`w-4 h-4 mr-2 ${activeStep >= 4 ? 'text-green-400' : 'text-gray-600'}`} />
                <span className={activeStep >= 4 ? 'text-green-400' : 'text-gray-600'}>
                  {activeStep >= 4 ? 'Rezultāti gatavi! Atrastas 42 atbilstošas detaļas.' : 'Gaidām rezultātus...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          Mūsu tīmekļa skrāpēšanas tehnoloģija darbojas ar Puppeteer - Node.js bibliotēku beztermināla Chrome pārlūku vadībai.
        </p>
      </div>
    </div>
  );
}