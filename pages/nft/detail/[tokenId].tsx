import React, { useEffect, useState, ChangeEvent } from 'react';
import { BaseLayout } from '@ui'
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useListedNfts } from '@hooks/web3';
import { useWeb3 } from '@providers/web3';
import { Open_Sans } from '@next/font/google';
import { Nft } from '@_types/nft';

const ArtDetail: NextPage = () => {
  const { ethereum } = useWeb3();
  const router = useRouter();
  const { tokenId } = router.query;
  const { nfts } = useListedNfts();
  const [nft, setNft] = useState<Nft | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [shipment, setShipments] = useState({
    address: "",
    postalCode: 0,
    owner: "",
  });

  useEffect(() => {
    if (tokenId && nfts.data) {
      const selectedNft = nfts.data.find(nft => nft.tokenId === Number(tokenId));
      setNft(selectedNft ?? null);
    }
  }, [tokenId, nfts.data]);


  if (!nft) {
    return <div>Loading...</div>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShipments({ ...shipment, [name]: value });
  }

  const getSignedData = async () => {
    const accounts = await ethereum?.request({ method: "eth_requestAccounts" }) as string[];
    const account = accounts[0];
    setShipments({ ...shipment, owner: account });
  }

  const handlePopupToggle = () => {
    setIsPopupVisible(!isPopupVisible);
    getSignedData();
  };


  return (
    <BaseLayout>
      <div>
        <div className="py-4 font-sans">
          <div className="container mx-auto px-4">
            {/* Section 1 */}
            <section className="grid grid-cols-12 gap-4 mb-8">
              <div className="col-span-12 md:col-span-4">
                <img
                  className="object-cover w-full h-full"
                  src={nft.meta.image}
                  alt={nft.meta.name}
                />
              </div>
              <div className="col-span-12 md:col-span-8">
                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">{nft.meta.artistName}</span>
                  <span className="text-3xl font-bold mt-2">{nft.meta.name}</span>
                  <span className="text-xl font-semibold text-black mt-2">{nft.price} ETH</span>
                  <div className="text-gray-500 mt-4">
                    {nft.meta.description}
                  </div>
                  <div className="mt-4 text-gray-500">
                    <ul className="list-disc ml-5">
                      <li>Token ID: {nft.tokenId}</li>
                      <li>Ukuran: {nft.meta.width}CM x {nft.meta.height}CM</li>
                      <li>Tahun: {nft.meta.createdAt}</li>
                      <li>Type: {nft.meta.attributes[0].value}</li>
                      <li>Paint: {nft.meta.attributes[1].value}</li>
                    </ul>
                  </div>
                  <div className="flex mt-4 space-x-4">
                    {/* <button onClick={() => {
                      nfts.buyNft(nft.tokenId, nft.price);
                    }} */}
                    <button onClick={handlePopupToggle}
                      type="button" className="bg-black text-white px-4 py-2 rounded">Buy Now</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-[#776B5D]">Description</h2>
              <div className="text-gray-500 space-y-4">
                <pre className="whitespace-pre-wrap font-sans">
                  {nft.meta.description}
                </pre>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-[#776B5D]">Shipping</h2>
              <div className="text-gray-500 space-y-4">
                <p>
                  At Luxsy, we understand that art collections go beyond the digital realm. That`&apos;`s why every NFT purchase on Luxsy comes with the delivery of the corresponding physical painting.
                </p>

                <h3 className="font-semibold">How Does the Shipping Process Work?</h3>

                <div>
                  <h4 className="font-bold">Trusted Courier Selection:</h4>
                  <p>
                    We partner with trusted and experienced couriers who specialize in handling art shipments. This ensures that your painting will arrive safely and in the best possible condition.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Secure Packaging:</h4>
                  <p>
                    The physical painting will be carefully packaged using high-quality materials to protect the artwork during transit. We take great care to ensure that every package is prepared with attention to detail and safety.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Shipment Tracking:</h4>
                  <p>
                    Once the physical painting is shipped, you will receive a tracking number that allows you to monitor the status of your shipment in real-time. You`&apos;`ll easily know when your painting is expected to arrive.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Delivery Confirmation:</h4>
                  <p>
                    We will request a confirmation of receipt once the painting has been delivered to you. This is part of our commitment to ensuring that every purchase on Luxsy provides a satisfying experience.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Shipping Time:</h4>
                  <p>
                    Shipping times may vary depending on your location and the type of courier service used. An estimated delivery time will be provided after the purchase process is completed. We always strive to ensure that the physical painting arrives in a timely manner.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Customer Support:</h4>
                  <p>
                    If you have any questions or need assistance with your shipment, our customer support team is ready to help. You can reach out to us through the contact information provided on our website.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-[#776B5D]">Packaging Art</h2>
              <div className="text-gray-500 space-y-4">
                <p>
                  At Luxsy, we understand the value of each piece of art you own. That`&apos;`s why we ensure that every physical painting you purchase through our platform is packaged with the utmost care, using high-quality materials.
                </p>

                <h3 className="font-semibold">Packaging Process</h3>

                <div>
                  <h4 className="font-bold">High-Quality Packaging Materials:</h4>
                  <p>
                    We use only the finest packaging materials, including sturdy cardboard, bubble wrap, and specialized corner protectors to keep the painting safe during transit. Each packaging component is carefully selected to provide maximum protection.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Layered Packaging:</h4>
                  <p>
                    Your painting will be packaged in layers to ensure protection from scratches, impacts, or weather conditions that may occur during shipping. These layers include surface protection, cushioning, and additional protective boxes.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Handled with Special Care:</h4>
                  <p>
                    Our experienced team, skilled in handling artwork, will ensure that each painting is packaged to the highest standards, preserving the beauty and integrity of the artwork until it reaches your hands.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Eco-Friendly Packaging:</h4>
                  <p>
                    Along with a focus on safety, we are also mindful of the environment. We use eco-friendly, recyclable packaging materials without compromising on protective quality.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Our Goal:</h4>
                  <p>
                    Our goal is to ensure that every physical painting you purchase on Luxsy arrives in perfect condition so that you can enjoy the beauty of the artwork without any worries.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Customer Support:</h4>
                  <p>
                    If you have any questions or concerns regarding the packaging, our customer support team is here to assist you. We are committed to making sure your shopping experience at Luxsy is satisfying from start to finish.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Main modal */}
      {isPopupVisible && (
        <div tabIndex={-1} aria-hidden="true" className={`font-sans fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ${isPopupVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`relative p-4 w-full max-w-md max-h-full transition-transform duration-300 transform ${isPopupVisible ? 'translate-y-0' : 'translate-y-[-100px]'
            }`}>
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  Shipment
                </h3>
                <button
                  type="button"
                  onClick={handlePopupToggle}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center ">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <div className="p-4 md:p-5 flex gap-4 flex-col">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="mt-1">
                    <textarea
                      value={shipment.address}
                      onChange={handleChange}
                      id="address"
                      name="address"
                      rows={3}
                      className="shadow-sm focus:ring-[#776B5D] focus:border-[#776B5D] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Some address..."
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <div className="mt-1">
                    <input
                      value={shipment.postalCode}
                      onChange={handleChange}
                      id="postalCode"
                      name="postalCode"
                      type='number'
                      className="shadow-sm focus:ring-[#776B5D] focus:border-[#776B5D] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Some postal code..."
                    />
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b gap-2">
                <button
                  type="button"
                  onClick={handlePopupToggle}
                  className="w-full bg-[#FF0000] text-white hover:bg-[#AA0000] hover:text-white rounded text-sm px-4 py-2">
                  Cancel
                </button>

                <button
                  onClick={() => {
                    nfts.buyNft(nft.tokenId, nft.price, shipment.owner, nft.meta.name, shipment.address, shipment.postalCode);
                  }}
                  type="button"
                  className="w-full bg-[#776B5D] text-white hover:bg-[#4F473E] hover:text-white rounded text-sm px-4 py-2">
                  Confirm
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default ArtDetail;
