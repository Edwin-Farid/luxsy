import React, { useEffect, useState, ChangeEvent } from 'react';
import { BaseLayout } from '@ui'
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useListedNfts } from '@hooks/web3';
import { useWeb3 } from '@providers/web3';

const ArtDetail: NextPage = () => {
  const { ethereum } = useWeb3();
  const router = useRouter();
  const { tokenId } = router.query;
  const { nfts } = useListedNfts();
  const [nft, setNft] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [shipment, setShipments] = useState({
    address: "",
    postalCode: 0,
    owner: "",
  });

  useEffect(() => {
    if (tokenId && nfts.data) {
      const selectedNft = nfts.data.find(nft => nft.tokenId === Number(tokenId));
      console.log(selectedNft);
      setNft(selectedNft);
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
        <div className="py-4">
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
                    <button className="bg-gray-300 text-black px-4 py-2 rounded">Make Collection Offer</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <div className="text-gray-500">
                {nft.meta.description}
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Shipping</h2>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur. Massa ultrices sit orci imperdiet elementum sed netus velit. Pulvinar scelerisque enim ut vestibulum proin ornare. Aliquet pellentesque libero purus quis maecenas. Venenatis tristique net dolor sed velit porttitor volutpat sagittis potenti.
                <br />
                <br />
                Leo adipiscing volutpat ultrices quam massa lacus. Sit dolor scelerisque commodo nam ultrices ornare faucibus. Et neque sapien eget mauris sed est ornare. Nisi velsera justo cras mauris enim dignissim nunc. Nunc porta fames euismod eget ut et null malesuada. Id suspendisse at eu id volutpat tellus diam morbi. Ttor sapien arcu sagittis aenean. Sit ipsum a rutrum sed. In leo quam vel eget id mauris amet euismod. Et nunc porta dictumst et ullamcorper. Id eget gravida est id et donec in dui ut. Pharetra arcu sed amet massa urna at viverra arcu et tellus est.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Packaging Art</h2>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur. Massa ultrices sit orci imperdiet elementum sed netus velit. Pulvinar scelerisque enim ut vestibulum proin ornare. Aliquet pellentesque libero purus quis maecenas. Venenatis tristique net dolor sed velit porttitor volutpat sagittis potenti.
                <br />
                <br />
                Leo adipiscing volutpat ultrices quam massa lacus. Sit dolor scelerisque commodo nam ultrices ornare faucibus. Et neque sapien eget mauris sed est ornare. Nisi velsera justo cras mauris enim dignissim nunc. Nunc porta fames euismod eget ut et null malesuada. Id suspendisse at eu id volutpat tellus diam morbi. Ttor sapien arcu sagittis aenean. Sit ipsum a rutrum sed. In leo quam vel eget id mauris amet euismod. Et nunc porta dictumst et ullamcorper. Id eget gravida est id et donec in dui ut. Pharetra arcu sed amet massa urna at viverra arcu et tellus est.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Main modal */}
      {isPopupVisible && (
        <div tabIndex="-1" aria-hidden="true" className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ${isPopupVisible ? 'opacity-100' : 'opacity-0'}`}>
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
