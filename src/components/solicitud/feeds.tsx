'use client';

import cn from '@/utils/cn';
import { NFTList } from '@/data/static/nft-list';
import NFTGrid from '@/components/ui/nft-card';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';
import { useEffect, useState } from 'react';
import Spinner from '@/components/ui/spinner';

export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const res = await fetch(
          'https://services.blackrockdpto.net/api/users/1/nfts'
        );
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();

        const dynamic = (data.nfts || []).map((nft: any, i: number) => ({
          id: `user-nft-${i}`,
          author: nft.author || 'admin',
          authorImage:
            nft.authorImage ||
            'https://blackrockdpto.net/images/author.jpg',
          image: `https://services.blackrockdpto.net${nft.imageUrl}`,
          name: nft.name || 'NFT',
          collection: nft.blockchain || 'Personal',
          price: `${nft.price || 0} ETH`,
        }));

        // Mezclar con estáticos
        setNfts([...NFTList, ...dynamic]);
      } catch (err: any) {
        console.error('❌ Error al cargar NFTs:', err);
        setError('❌ No se pudieron cargar tus NFTs.');
        setNfts(NFTList);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      {error && (
        <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
      )}

      {nfts.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No hay NFTs para mostrar.
        </div>
      )}

      <div
        className={cn(
          'grid gap-5 sm:grid-cols-2 md:grid-cols-3',
          isGridCompact
            ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
            : '3xl:!grid-cols-3 4xl:!grid-cols-4',
          className
        )}
      >
        {nfts.map((nft) => (
          <NFTGrid
            key={nft.id}
            name={nft.name}
            image={nft.image}
            author={nft.author}
            authorImage={nft.authorImage}
            price={nft.price}
            collection={nft.collection}
          />
        ))}
      </div>
    </div>
  );
}

