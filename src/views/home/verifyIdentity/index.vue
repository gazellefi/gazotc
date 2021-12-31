<template>
	<div class="start" style="opacity: 1; background-color: rgb(70, 82, 103);height: 100%;">
		<div class="verification">
			<div class="content">
				<div class="title">
					Start verification
				</div>
				<div class="main">
					<div class="topMain">
						This process is designed to verify your identity and protect you from identity theft.
					</div>
					<div class="bottomMain">
						Please have your ID ready and click 'Start'.
					</div>
				</div>
				<div class="Footerbut">
					<button type="button">Start</button>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
	body{
		width: 100%;
		height: 100%;
	}
	.start{
		box-sizing: border-box;
		.verification{
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			background-color: #fff;
			width: 80%;
			height: 80%;
			margin: 10%;
			border-radius: 5px;
			display: flex;
			// flex-direction: column;
			text-align: center;
			align-items: center;
			justify-content: center;
			.content{
				max-width: 415px;
				.Footerbut{
					button{
						padding: 20px;
						width: 100%;
						background-color: rgb(151, 190, 13);
						color: #fff;
						text-shadow: rgba(0, 0, 0, 0.4) 0px 0px 3px;
					}
				}
			}
		}
	}
</style>
