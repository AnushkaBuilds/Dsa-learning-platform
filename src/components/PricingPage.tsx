import React from 'react';
import { Check, Star, Lock, PlayCircle, Users, TrendingUp } from 'lucide-react';

const features = [
	{
		icon: <Lock className="w-8 h-8 text-blue-500 mb-2" />,
		title: 'Premium Content',
		description:
			'Unlock premium question breakdowns, exclusive explanations, and advanced DSA/system design content. Includes video solutions and deep dives.',
	},
	{
		icon: <PlayCircle className="w-8 h-8 text-green-500 mb-2" />,
		title: 'Guided Practice',
		description:
			'Work through common interview problems step-by-step and get instant, personalized feedback with interactive code execution.',
	},
	{
		icon: <TrendingUp className="w-8 h-8 text-yellow-500 mb-2" />,
		title: 'Recent Interview Questions',
		description:
			'Get access to thousands of recent interview questions and experiences from top tech companies.',
	},
	{
		icon: <Users className="w-8 h-8 text-purple-500 mb-2" />,
		title: 'Community & Support',
		description: 'Join a vibrant community, get priority support, and connect with peers and mentors.',
	},
];

const PricingPage: React.FC = () => {
	const plans = [
		{
			name: 'Free',
			price: '$0',
			period: 'forever',
			description: 'Perfect for getting started with DSA learning',
			features: [
				'5 problems per month',
				'Basic explanations',
				'Community access',
				'Progress tracking',
			],
			buttonText: 'Get Started',
			buttonStyle:
				'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
			onClick: () => (window.location.href = '/signup'),
		},
		{
			name: 'Premium',
			price: '$19',
			period: 'per month',
			description: 'Unlimited access to all features and content',
			features: [
				'Unlimited problems',
				'Detailed explanations with visuals & videos',
				'Advanced code editor',
				'Guided practice & instant feedback',
				'Recent interview questions',
				'Priority support',
				'Progress analytics',
			],
			buttonText: 'Get Premium',
			buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
			popular: true,
			onClick: () => (window.location.href = '/premium/checkout'),
		},
		{
			name: 'Team',
			price: '$49',
			period: 'per month',
			description: 'Perfect for teams and organizations',
			features: [
				'Everything in Premium',
				'Team management',
				'Custom learning paths',
				'Advanced analytics',
				'Dedicated support',
				'API access',
			],
			buttonText: 'Contact Sales',
			buttonStyle:
				'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
			onClick: () => (window.location.href = '/contact-sales'),
		},
	];

	return (
		<div className="max-w-6xl mx-auto px-6 py-8">
			{/* Hero Section */}
			<div className="text-center mb-16">
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
					Get Unlimited Access with Premium
				</h1>
				<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
					Get unlimited access to premium content, Guided Practice problems, and up-to-date interview questions and experiences from your target companies.
				</p>
				<button
					className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200"
					onClick={() => (window.location.href = '/premium/checkout')}
				>
					Purchase For $19 Per Month
				</button>
				<div className="mt-2 text-gray-500 text-sm">
					7-day free trial. Cancel anytime.
				</div>
			</div>

			{/* Features Section */}
			<div className="grid md:grid-cols-4 gap-8 mb-20">
				{features.map((feature, idx) => (
					<div
						key={idx}
						className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-center flex flex-col items-center"
					>
						{feature.icon}
						<h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
							{feature.title}
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							{feature.description}
						</p>
					</div>
				))}
			</div>

			{/* Pricing Section */}
			<div className="text-center mb-12">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
					Pricing
				</h2>
				<p className="text-gray-600 dark:text-gray-400 mb-8">
					Choose the plan that fits your needs. No hidden fees, cancel anytime.
				</p>
			</div>
			<div className="grid md:grid-cols-3 gap-8 mb-16">
				{plans.map((plan, index) => (
					<div
						key={index}
						className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-200 hover:scale-105 ${
							plan.popular
								? 'border-blue-500 dark:border-blue-400'
								: 'border-gray-200 dark:border-gray-700'
						}`}
					>
						{plan.popular && (
							<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
								<div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
									<Star className="w-4 h-4" />
									<span>Most Popular</span>
								</div>
							</div>
						)}
						<div className="p-8">
							<div className="text-center mb-8">
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
									{plan.name}
								</h3>
								<div className="mb-4">
									<span className="text-4xl font-bold text-gray-900 dark:text-white">
										{plan.price}
									</span>
									<span className="text-gray-600 dark:text-gray-400 ml-2">
										{plan.period}
									</span>
								</div>
								<p className="text-gray-600 dark:text-gray-400">
									{plan.description}
								</p>
							</div>
							<ul className="space-y-4 mb-8">
								{plan.features.map((feature, featureIndex) => (
									<li
										key={featureIndex}
										className="flex items-center space-x-3"
									>
										<Check className="w-5 h-5 text-green-500 flex-shrink-0" />
										<span className="text-gray-700 dark:text-gray-300">
											{feature}
										</span>
									</li>
								))}
							</ul>
							<button
								onClick={plan.onClick}
								className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${plan.buttonStyle}`}
							>
								{plan.buttonText}
							</button>
						</div>
					</div>
				))}
			</div>

			{/* FAQ Section */}
			<div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
					Frequently Asked Questions
				</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<div>
						<h3 className="font-semibold text-gray-900 dark:text-white mb-2">
							What is included with Premium?
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							Unlimited access to all problems, detailed solutions, guided practice,
							and real interview questions. Plus, priority support and new content as
							it launches.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 dark:text-white mb-2">
							Do I need Premium to access the content?
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							Some content is free, but Premium unlocks all problems, solutions, and
							advanced features.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 dark:text-white mb-2">
							Does the purchase auto-renew?
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							No, your subscription does not auto-renew. You will have access for the
							duration you select.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 dark:text-white mb-2">
							Will I get access to new content?
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							Yes! All new problems and features are included in your Premium access
							at no extra cost.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 dark:text-white mb-2">
							Is there a free trial?
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							Yes, Premium comes with a 7-day free trial. Cancel anytime, no questions
							asked.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 dark:text-white mb-2">
							What payment methods do you accept?
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							We accept all major credit cards, PayPal, and bank transfers for annual
							plans.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 dark:text-white mb-2">
							Do you offer student discounts?
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							Yes, we offer 50% off for students with a valid .edu email address.
							Contact support for details.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PricingPage;