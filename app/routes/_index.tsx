import type { MetaFunction } from '@remix-run/node';
import Back from '../components/back';
import Frame from '../components/frame';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Fractal Generator' },
		{
			name: 'description',
			content: 'Something about ai, idk'
		}
	];
};

export default function Index() {
	return (
		<main className="h-screen overflow-hidden">
			<Frame />
		</main>
	);
}
