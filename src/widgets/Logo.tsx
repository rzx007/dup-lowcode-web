import logoImg from '@/assets/logo.png'
export const Logo = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
      }}>
      <img alt='rxeditor' height={32} width={32} src={logoImg} />
    </div>
  )
}
