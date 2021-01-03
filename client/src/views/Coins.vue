<template>
    <div>
        <navbarapp/>
        <cryptoInformation/>
    </div>
</template>

<script>
    import cryptoInformation from "@/components/CryptoInformation"
    import navbarapp from "@/components/NavBarApp.vue"

    export default {
        components: {
            cryptoInformation,
            navbarapp
        },
        computed: {
            auth() {
                return this.$store.getters['user/isAuthenticated']
            }
        }
    }
</script>

<style scoped>

</style>