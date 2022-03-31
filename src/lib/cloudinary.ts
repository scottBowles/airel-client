import { Cloudinary } from '@cloudinary/url-gen';

/**
 * Store holding the cloudinary instance to be used throughout the app
 * Documentation here:
 * https://cloudinary.com/documentation/javascript_integration
 */
const cloudName: string = import.meta.env.VITE_CLOUD_NAME.toString();
const cloudinary = new Cloudinary({
	cloud: { cloudName }
});

export default cloudinary;
