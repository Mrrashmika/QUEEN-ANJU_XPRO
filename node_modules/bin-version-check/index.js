import semver from 'semver';
import binaryVersion from 'binary-version';
import semverTruncate from 'semver-truncate';

export default async function binaryVersionCheck(binary, semverRange, options) {
	if (typeof binary !== 'string' || typeof semverRange !== 'string') {
		throw new TypeError('`binary` and `semverRange` arguments required');
	}

	if (!semver.validRange(semverRange)) {
		throw new Error('Invalid version range');
	}

	const version = await binaryVersion(binary, options);

	if (semver.satisfies(semverTruncate(version, 'patch'), semverRange)) {
		return;
	}

	const error = new Error(`${binary} ${version} does not satisfy the version requirement of ${semverRange}`);
	error.name = 'InvalidBinaryVersion';
	throw error;
}
