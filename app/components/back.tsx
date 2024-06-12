import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export default function Back() {
	return (
		<div className="h-screen w-screen select-none">
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				href="https://fonts.googleapis.com/css2?family=Italianno&display=swap"
				rel="stylesheet"
			/>

			<div
				className={`default-bg absolute bottom-[-10vh] left-[-10vw] h-[120vh] w-[120vw] select-none`}
			></div>

			<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>

			<a
				href="https://github.com/crllect/precalc-project"
				className="absolute bottom-[0.5rem] left-[0.5rem] z-10"
			>
				<Button variant="outline" className="flex size-10 flex-col">
					<Github />
				</Button>
				<span className="absolute bottom-[0.5rem] left-[3rem] z-10">
					GitHub
				</span>
			</a>
		</div>
	);
}
