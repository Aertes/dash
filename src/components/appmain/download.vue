<template>
	<div class="tables-wrap" id="upLoadBox">
         <div class="downLoadUrl">
            <input type="text" name="url" id="url" :value="url">
            <button type="reset">点击复制</button>
        </div>
	</div>
</template>

<script type="text/ecmascript-6">
    

    export default{
        name:'downLoad',
        props:['downloadUrl'],
    }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    @import '../../assets/style/mixin.styl';

</style>
