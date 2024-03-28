import java.util.Scanner;
public class TwitterTowers 
{
	static Scanner in=new Scanner(System.in);
	
	public static void rectangle()
	{
		System.out.println("Enter width and length ");
		int width=in.nextInt(), length=in.nextInt();
		
		if(width==length || Math.abs(length-width)>5)
			System.out.println("Square area: "+width*length);
		else
			System.out.println("Square perimeter: "+2*(width+length));
	}
	
	public static void triangle()
	{
		System.out.println("Enter width and height ");
		int width=in.nextInt(), height=in.nextInt();
		
		System.out.println("To calculate the perimeter of the triangle press one,"
				+ " to print the triangle press two");
		
		int x= in.nextInt();
		switch(x)
		{
		case 1:
			double perimeter=2*(Math.sqrt(Math.pow((double)width,2)+Math.pow(width/2.0,2)))+width;
			System.out.println("Triangle perimeter: "+perimeter);
			break;
		case 2:
			if(width>height*2 || width%2==0)
			{
				System.out.println("The triangle cannot be printed");
				return;	
			}
			printTriangle(width, height);
			break;
		default:
			System.out.println("Unspecified answer");
			return;
		}

	}
	
	public static void printTriangle(int width, int height)
	{
		int rounds=(width-2)/2,count=1,rows=1;
		for (int i = 0; i < rounds+2; i++,count+=2) 
		{

			if(i==rounds+1)//שורה אחרונה
				rows=rounds==0?height-1:1;
			else
				if(i==1)//שורה שניה
					rows=(height-2)/rounds+(height-2)%rounds;
				else
					if(i>1)//שאר השורות
						rows=(height-2)/rounds;
	
			for (int j = 0; j < rows; j++) 
			{
				for (int j2 = 0; j2 <width; j2++) 
				{
					System.out.print((j2<(width-count)/2||width-j2-1<(width-count)/2)?" ":"*");
				}
				System.out.println();
			}
		}
	}
	
	public static void main(String[] args) 
	{		
		System.out.println("For a rectangle tower press one,"
				+ " for a triangular tower press two"
				+ " to finish press three");
		int x=in.nextInt();
		
		while(x!=3)
		{
			switch(x) 
			{
				case 1:
					rectangle();
					break;
				case 2:
					triangle();
					break;
				default:
					System.out.println("Unspecified answer");						
			}	
			System.out.println("For a rectangle tower press one,"
					+ " for a triangular tower press two"
					+ " to finish press three");
			x=in.nextInt();	
		}
		
		System.out.println("<< End >>");		
	}
}
