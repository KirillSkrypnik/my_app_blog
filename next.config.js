/** @type {import('next').NextConfig} */
const nextConfig = {}
const allowedImageWordPressDomain = new URL( process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL ).hostname;

// module.exports = nextConfig

module.exports = {
	images: {
		domains: [ allowedImageWordPressDomain, 'via.placeholder.com', 'secure.gravatar.com' ],
	},
}