let loader = findElement('#loader');

function changeLoading(isLoading) {
	if (isLoading) {
		loader.style.display = 'block';
	} else {
		loader.style.display = 'none';
	}
}

export default changeLoading;