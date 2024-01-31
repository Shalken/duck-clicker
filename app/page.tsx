'use client'

import Image from "next/image";
import 'animate.css';
import { useEffect, useState } from "react";

export default function Home() {

  const [quacks, setQuacks] = useState(0);
  const [nuts, setNuts] = useState(0);
  const [gourdons, setGourdons] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      let add = 0;
      if(nuts > 0) {
        add = add + (nuts * 0.1)
      }

      if(gourdons > 0) {
        add = add + (gourdons * 0.25)
      }
      
      setQuacks(quacks + add)
      document.title = `${quacks.toFixed(2)} quacks - Duck Clicker`
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [quacks, nuts, gourdons]);

  const [audio] = useState<HTMLAudioElement | null>(typeof Audio !== 'undefined' ? new Audio("/sounds/quack.mp3") : null)
  const handleClick = (event: any) => {
    audio?.play();

    const bigDuck = document.getElementById('bigDuck');
    
    bigDuck?.classList.toggle('animate__animated')
    bigDuck?.classList.toggle('animate__headShake')
    bigDuck?.style.setProperty('--animate-duration', '0.5s');
    
    var x = event.clientX;
    var y = event.clientY;
    
    var smallDuck = document.createElement('img');
    smallDuck.width = 25
    smallDuck.height = 25
    smallDuck.alt = 'Small Duck'
    smallDuck.src = '/images/duck.png'
    smallDuck.style.display = 'block';
    smallDuck.style.position = 'absolute';
    smallDuck.style.left = x + 'px';
    smallDuck.style.top = y + 'px';
    
    smallDuck.classList.add('animate__animated')
    smallDuck.classList.add('animate__rotateOutDownLeft')
    
    
    document.getElementById('ducks')?.appendChild(smallDuck);
    setQuacks(quacks + 1)
  }

  const handleNutPurchase = () => {
    if(quacks >= (5 * quantity)) {
      setNuts(nuts + quantity)
      setQuacks(quacks - (5 * quantity))
    }
  }

  const handleGourdonPurchase = () => {
    if(quacks >= (10 * quantity)) {
      setGourdons(gourdons + quantity)
      setQuacks(quacks - (10 * quantity))
    }
  }

  console.log(quantity)
  return (
    <div className="flex h-[95vh] border-2 border-stone-700">
      <div id='ducks' className="w-1/4 flex flex-col justify-center items-center border-r-2 border-stone-700">
        <p className="text-3xl text-stone-400">{`${quacks.toFixed(2)} Quacks`}</p>
        <p className="text-md text-stone-400">{`${((nuts * 0.1) + (gourdons * 0.25)).toFixed(2)} Quacks / Second`}</p>
        <Image id='bigDuck' src="/images/duck.png" width={150} height={150} alt='Duck' onClick={(event) => {handleClick(event)}} />

      </div>
      <div className="flex flex-col gap-10 w-3/4 items-start p-5">
        <div className="flex gap-3 items-center">
          <p className="text-lg text-stone-400">Buy</p>
          <button className={`text-lg px-5 py-1 rounded-md bg-stone-600 ${quantity === 1 && 'bg-stone-400'}`} onClick={() => setQuantity(1)}>1</button>
          <button className={`text-lg px-5 py-1 rounded-md bg-stone-600 ${quantity === 10 && 'bg-stone-400'}`} onClick={() => setQuantity(10)}>10</button>
          <button className={`text-lg px-5 py-1 rounded-md bg-stone-600 ${quantity === 25 && 'bg-stone-400'}`} onClick={() => setQuantity(25)}>25</button>
          <button className={`text-lg px-5 py-1 rounded-md bg-stone-600 ${quantity === 50 && 'bg-stone-400'}`} onClick={() => setQuantity(50)}>50</button>
          <button className={`text-lg px-5 py-1 rounded-md bg-stone-600 ${quantity === 100 && 'bg-stone-400'}`} onClick={() => setQuantity(100)}>100</button>
        </div>

        <div className="flex flex-wrap gap-5">
          <div className={`flex flex-col w-[300px] gap-5 py-2 pr-3 pl-3 rounded-md ${quacks >= (5 * quantity) ? 'bg-stone-800 hover:bg-stone-700' : 'bg-stone-900'}`} onClick={() => handleNutPurchase()}>
            <div className="flex items-center justify-between gap-3">
              <Image src="/images/nut.png" width={50} height={50} alt='Nut' />
              <p className="text-md text-stone-400">Nut Knights</p>
              <p className="text-4xl text-stone-400">{nuts}</p>
            </div>
            <div className="flex gap-3 justify-end">
              <Image src="/images/duck.png" width={20} height={20} alt='Duck' />
              <p className={`text-md ${quacks >= (5 * quantity) ? 'text-green-600' : 'text-red-600'}`}>{5 * quantity}</p>
            </div>
          </div>


          {nuts >= 10 && (
            <div className={`flex flex-col w-[300px] gap-5 py-2 pr-3 pl-3 rounded-md ${quacks >= (10 * quantity) ? 'bg-stone-800 hover:bg-stone-700' : 'bg-stone-900'}`} onClick={() => handleGourdonPurchase()}>
            <div className="flex items-center justify-between gap-3">
              <Image src="/images/gourdon.png" width={50} height={50} alt='Nut' />
              <p className="text-md text-stone-400">Gourdons</p>
              <p className="text-4xl text-stone-400">{gourdons}</p>
            </div>
            <div className="flex gap-3 justify-end">
              <Image src="/images/duck.png" width={20} height={20} alt='Duck' />
              <p className={`text-md ${quacks >= (10 * quantity) ? 'text-green-600' : 'text-red-600'}`}>{10 * quantity}</p>
            </div>
          </div>

          )}
          

        </div>




      </div>
    </div>
  );
}
