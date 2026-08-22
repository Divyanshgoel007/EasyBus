function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button className={`button button-${variant}`} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
