import React from 'react'
import NavbarDashboard from './NavbarDashboard'
import FooterDashboard from './FooterDashboard'

type LayoutProps = {
	children: React.ReactNode
}

export default function LayoutDashboard({ children }: LayoutProps) {
	return (
		<>
			<NavbarDashboard />
			<main>{children}</main>
			<FooterDashboard />
		</>
	)
}
