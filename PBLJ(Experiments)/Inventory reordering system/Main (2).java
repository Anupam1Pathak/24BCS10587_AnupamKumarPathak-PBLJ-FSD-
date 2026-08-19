import java.util.Scanner;
import java.util.LinkedList;

public class Main
{
	public static void main(String[] args) {
		Scanner sc= new Scanner(System.in);
		
		System.out.println("enter rows");
		int rows= sc.nextInt();
		
		System.out.println("enter column");
		int col=sc.nextInt();
		
		int[][]arr= new int[rows][col];
		
		System.out.println("enter elements");
		for(int i=0;i<rows;i++){
		    for(int j=0;j<col;j++){
		        arr[i][j]=sc.nextInt();
		    }
		}
		
		LinkedList<Integer>list=new LinkedList<>();
		
		for(int i=0;i<rows;i++){
		    for(int j=0;j<col;j++){
		       if(arr[i][j]<5){
		           list.add(arr[i][j]*2);
		       }
		    }
		}
		
		for(int i=0;i<list.size();i++){
		    System.out.println(list.get(i));
		}
	}
}
