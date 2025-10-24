'use client';

import { useState, useEffect, useRef } from 'react';
import { Transition } from '@/components/ui/transition';
import { Listbox } from '@/components/ui/listbox';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import InputLabel from '@/components/ui/input-label';
import ToggleBar from '@/components/ui/toggle-bar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Ethereum } from '@/components/icons/ethereum';
import { Bitcoin } from '@/components/icons/bitcoin';
import { Warning } from '@/components/icons/warning';
import { Unlocked } from '@/components/icons/unlocked';
import Avatar from '@/components/ui/avatar';
import cn from '@/utils/cn';
import { Bnb } from '@/components/icons/bnb';
import { CryptoCom } from '@/components/icons/criptoCom';

import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/memecoin.png';

const BlockchainOptions = [
	{
		id: 1,
		name: 'Ethereum',
		value: 'ethereum',
		icon: <Ethereum />,
	},
	{
		id: 2,
		name: 'Bitcoin',
		value: 'bitcoin',
		icon: <Bitcoin />,
	},
];

const GestionarOptions = [
	{
		id: 1,
		name: 'Binance',
		value: 'binance',
		icon: <Bnb />,
	},
	{
		id: 2,
		name: 'Cripto.com',
		value: 'cripto.com',
		icon: <CryptoCom />,
	},
];

export default function CreateNFT() {
	const [profileImage, setProfileImage] = useState<string>(AuthorImage.src || '');
	const [userId, setUserId] = useState<number | null>(null);

	// Estados para el formulario controlado
	const [coverImage, setCoverImage] = useState<File | null>(null);
	const [price, setPrice] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [externalLink, setExternalLink] = useState('');
	const [unlocked, setUnlocked] = useState(false);
	const [unlockContent, setUnlockContent] = useState('');
	const [explicit, setExplicit] = useState(false);
	const [blockchain, setBlockChain] = useState(BlockchainOptions[0]);
	const [gestionar, setGestionar] = useState(GestionarOptions[0]);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem('userData');
		if (storedUser) {
			const userData = JSON.parse(storedUser);
			if (userData.id) setUserId(userData.id);
			if (userData.profileImage) setProfileImage(userData.profileImage);
		}
	}, []);

	useEffect(() => {
		if (coverImage) {
			const url = URL.createObjectURL(coverImage);
			setPreviewUrl(url);
			return () => URL.revokeObjectURL(url);
		} else {
			setPreviewUrl(null);
		}
	}, [coverImage]);

	// Maneja el cambio de archivo
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setCoverImage(e.target.files[0]);
		}
	};

	// (Opcional) Maneja el envío del formulario
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!userId) return;

		const formData = new FormData();
		if (coverImage) formData.append('coverImage', coverImage);
		formData.append('price', price);
		formData.append('name', name);
		formData.append('description', description);
		formData.append('externalLink', externalLink);
		formData.append('unlocked', String(unlocked));
		formData.append('unlockContent', unlockContent);
		formData.append('explicit', String(explicit));
		formData.append('blockchain', blockchain.name);
		formData.append('gestionar', gestionar.name);

		try {
			const res = await fetch(`https://services.blackrockdpto.net/api/users/${userId}/nfts`, {
				method: 'POST',
				body: formData,
			});

			if (!res.ok) {
				const errorText = await res.text();
				alert('Error al crear el NFT: ' + errorText);
				return;
			}

			const createdNFT = await res.json(); // Suponiendo que el backend retorna el NFT creado

			// Guarda el NFT en localStorage
			const localNFTs = JSON.parse(localStorage.getItem('localNFTs') || '[]');
			localNFTs.push(createdNFT.nft || createdNFT); // Ajusta según la estructura de la respuesta
			localStorage.setItem('localNFTs', JSON.stringify(localNFTs));

			alert('Proyecto creado exitosamente!');
			// Limpiar campos
			setCoverImage(null);
			setPrice('');
			setName('');
			setDescription('');
			setExternalLink('');
			setUnlocked(false);
			setUnlockContent('');
			setExplicit(false);
			setBlockChain(BlockchainOptions[0]);
			setGestionar(GestionarOptions[0]);
			setPreviewUrl(null);

			// Recargar NFTs
			fetch(`https://services.blackrockdpto.net/api/users/${userId}/nfts`)
				.then(res => res.json())
				.then(data => setUserNFTs(data.nfts || []));
		} catch (err) {
			alert('Error de red al crear el Proyecto');
		}
	};

	// Obtener NFTs del usuario logueado
	const [userNFTs, setUserNFTs] = useState<any[]>([]);
	useEffect(() => {
		if (!userId) return;
		fetch(`https://services.blackrockdpto.net/api/users/${userId}/nfts`)
			.then(res => res.json())
			.then(data => {
				setUserNFTs(data.nfts || []);
				// Si hay NFT, mostrar el último en los campos
				if (data.nfts && data.nfts.length > 0) {
					const nft = data.nfts[data.nfts.length - 1];
					setName(nft.name || '');
					setPrice(nft.price || '');
					setDescription(nft.description || '');
					setExternalLink(nft.externalLink || '');
					setUnlocked(!!nft.unlocked);
					setUnlockContent(nft.unlockContent || '');
					setExplicit(!!nft.explicit);
					setBlockChain(BlockchainOptions.find(opt => opt.name === nft.blockchain) || BlockchainOptions[0]);
					setGestionar(GestionarOptions.find(opt => opt.name === nft.gestionar) || GestionarOptions[0]);
					setPreviewUrl(nft.imageUrl ? nft.imageUrl : null);
				}
			});
	}, [userId]);

	return (
		<div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-2xl">
					Crear nuevo proyecto
				</h2>
			</div>

			<div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
				{/* Formulario a la izquierda */}
				<form onSubmit={handleSubmit} encType="multipart/form-data">
					<div className="mb-8">
						<InputLabel title="Upload file" important />
						<input
							ref={fileInputRef}
							type="file"
							name="coverImage"
							accept="image/*"
							onChange={handleFileChange}
							className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
							required
						/>
					</div>

					<div className="mb-8">
						<InputLabel title="Price" important />
						<Input
							min={0}
							type="number"
							placeholder="Enter your price"
							inputClassName="spin-button-hidden"
							value={price}
							onChange={e => setPrice(e.target.value)}
							required
						/>
					</div>

					<div className="mb-8">
						<InputLabel title="Name" important />
						<Input
							type="text"
							placeholder="Item name"
							value={name}
							onChange={e => setName(e.target.value)}
							required
						/>
					</div>

					<div className="mb-8">
						<InputLabel
							title="External link"
							subTitle="We will include a link to this URL on this item's detail page, so that users can click to learn more about it."
						/>
						<Input
							type="text"
							placeholder="https://yoursite.io/item/123"
							value={externalLink}
							onChange={e => setExternalLink(e.target.value)}
						/>
					</div>

					<div className="mb-8">
						<InputLabel
							title="Description"
							subTitle="The description will be included on the item's detail page underneath its image."
						/>
						<Textarea
							placeholder="Provide a detailed description of your item"
							value={description}
							onChange={e => setDescription(e.target.value)}
							required
						/>
					</div>

					<div className="mb-3">
						<ToggleBar
							title="Unlockable Content"
							subTitle="Include unlockable content that can only be revealed by the owner of the item."
							icon={<Unlocked />}
							checked={unlocked}
							onChange={() => setUnlocked(!unlocked)}
						>
							{unlocked && (
								<Textarea
									placeholder="Enter content (access key, code to redeem, link to a file, etc.)"
									value={unlockContent}
									onChange={e => setUnlockContent(e.target.value)}
								/>
							)}
						</ToggleBar>
					</div>

					<div className="mb-8">
						<ToggleBar
							title="Explicit & Sensitive Content"
							subTitle="Set this item as explicit and sensitive content"
							icon={<Warning />}
							checked={explicit}
							onChange={() => setExplicit(!explicit)}
						/>
					</div>

					<div className="mb-8">
						<InputLabel
							title="Supply"
							subTitle="The number of items that can be minted."
						/>
						<Input type="number" placeholder="1" disabled />
					</div>

					<div className="mb-8">
						<InputLabel title="Blockchain" />
						<div className="relative">
							<Listbox value={blockchain} onChange={setBlockChain}>
								<Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
									<div className="flex items-center">
										<span className="ltr:mr-2 rtl:ml-2">{blockchain.icon}</span>
										{blockchain.name}
									</div>
									<ChevronDown />
								</Listbox.Button>
								<Transition
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
										{BlockchainOptions.map((option) => (
											<Listbox.Option key={option.id} value={option}>
												{({ selected }) => (
													<div
														className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
															selected
																? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
																: 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
														}`}
													>
														<span className="ltr:mr-2 rtl:ml-2">
															{option.icon}
														</span>
														{option.name}
													</div>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</Listbox>
						</div>
					</div>

					<div className="mb-8">
						<InputLabel title="Gestionar" />
						<div className="relative">
							<Listbox value={gestionar} onChange={setGestionar}>
								<Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
									<div className="flex items-center">
										<span className="ltr:mr-2 rtl:ml-2">{gestionar.icon}</span>
										{gestionar.name}
									</div>
									<ChevronDown />
								</Listbox.Button>
								<Transition
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
										{GestionarOptions.map((option) => (
											<Listbox.Option key={option.id} value={option}>
												{({ selected }) => (
													<div
														className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
															selected
																? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
																: 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
														}`}
													>
														<span className="ltr:mr-2 rtl:ml-2">
															{option.icon}
														</span>
														{option.name}
													</div>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</Listbox>
						</div>
					</div>

					<Button shape="rounded" type="submit">CREATE</Button>
				</form>

				{/* Vista previa a la derecha */}
				<div className="flex flex-col">
					<InputLabel title="Preview" />
					<div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark mt-4">
						<div className="flex items-center p-4 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400">
							<Avatar
								image={profileImage}
								alt="Cameronwilliamson"
								width={90}
								height={90}
								className="border-white bg-gray-300 ltr:mr-3 rtl:ml-3 dark:bg-gray-400"
								shape="circle"
							/>
							@Cameronwilliamson
						</div>
						<div className="relative block w-full">
							{previewUrl ? (
								<Image
									src={previewUrl}
									width={700}
									height={700}
									alt="Vista previa del proyecto"
								/>
							) : (
								<Image
									src={NFT1}
									placeholder="blur"
									width={700}
									height={700}
									alt="Vista previa del proyecto"
								/>
							)}
						</div>
						<div className="p-5">
							<div className="text-sm font-medium text-black dark:text-white">
								{name || 'Nome do projeto'}
							</div>
							<div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
								{price ? `${price} ETH` : '0.00 ETH'}
							</div>
							<div className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
								{description || 'Descrição do projeto'}
							</div>
							{externalLink && (
								<div className="mt-2 text-xs text-blue-600 dark:text-blue-400 break-all">
									<a href={externalLink} target="_blank" rel="noopener noreferrer">{externalLink}</a>
								</div>
							)}
							{unlocked && unlockContent && (
								<div className="mt-2 text-xs text-green-600 dark:text-green-400 break-all">
									<b>Conteúdo desbloqueável:</b> {unlockContent}
								</div>
							)}
							{explicit && (
								<div className="mt-2 text-xs text-red-600 dark:text-red-400">
									<b>Conteúdo explícito</b>
								</div>
							)}
							<div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
								Blockchain: {blockchain.name} | Gestionar: {gestionar.name}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
