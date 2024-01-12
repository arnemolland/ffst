export function Analytics({
	token,
}: {
	token: string;
}) {
	return (
		<script
			defer
			src="https://unpkg.com/@tinybirdco/flock.js"
			data-host="https://api.tinybird.co"
			data-token={token}
		/>
	);
}
