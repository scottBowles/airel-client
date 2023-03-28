import { Cloudinary } from '@cloudinary/url-gen';
import { defaultImage } from '@cloudinary/url-gen/actions/delivery';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';

/**
 * Store holding the cloudinary instance to be used throughout the app
 * Documentation here:
 * https://cloudinary.com/documentation/javascript_integration
 */
const cloudName: string = import.meta.env.VITE_CLOUD_NAME.toString();
const cloudinary = new Cloudinary({
	cloud: { cloudName }
});

export function getThumbnailUrl(
	imageId: string,
	{ width = 75, height = 75, radius = 0, defaultSrc = 'dnd:placeholder.jpg' } = {}
) {
	return cloudinary
		.image(imageId)
		.resize(thumbnail().width(width).height(height).gravity(focusOn(FocusOn.face())))
		.roundCorners(byRadius(radius))
		.delivery(defaultImage(defaultSrc))
		.toURL();
}

export default cloudinary;
