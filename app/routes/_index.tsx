import type { MetaFunction } from '@remix-run/node';
import FrameContainer from '../components/frameContainer';
import Back from '../components/back';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Mandlebrot Set Viewer' },
		{
			name: 'description',
			content: 'Best mandlebrot view fr'
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
