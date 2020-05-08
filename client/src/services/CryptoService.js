import Api from '@/services/Api'

export default {
    getCryptoNews () {
        return Api().get('getcrypto')
    },
    getCryptoQuotehistory () {
        return Api().get('getcryptoquote')
    }
}