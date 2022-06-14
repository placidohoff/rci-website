import { useStateValue } from '../../redux/StateProvider'
import { useRouter } from 'next/router'


const [{ userFirstName, isLoggedIn }, dispatch] = useStateValue()
const router = useRouter()

export const checkLoggedIn = () => {
    !isLoggedIn
        ? router.push('/') 
        : null
}