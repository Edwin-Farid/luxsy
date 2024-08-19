import React, { useEffect, useState } from 'react';
import { BaseLayout } from '@ui'
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useListedNfts } from '@hooks/web3';

const ArtDetail: NextPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const { nfts } = useListedNfts();
  const [nft, setNft] = useState(null);

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
                  <span className="text-gray-500 font-medium">{nft.meta.creator}</span>
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
                    <button onClick={() => {
                      nfts.buyNft(nft.tokenId, nft.price);
                      router.push(`/`);
                    }}
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
    </BaseLayout>
  );
};

export default ArtDetail;
