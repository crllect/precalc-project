import type { MetaFunction } from '@remix-run/node';
import FrameContainer from '../components/frameContainer';
import Back from '../components/back';

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
			<FrameContainer />

			<Back />
		</main>
	);
}
